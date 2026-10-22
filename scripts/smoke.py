#!/usr/bin/env python3
"""Optional browser smoke checks: Python 3 + Playwright + Chromium.

Start the app separately, then run:
    python3 scripts/smoke.py --base-url http://127.0.0.1:4173

Only the Google Maps iframe response is mocked with a labeled local document.
These tests verify its integration, not live Maps access (the cloud proxy
currently returns HTTP 403 for Google Maps).
"""
import argparse
import re
import shutil
import sys
import unittest
from urllib.parse import parse_qs, urlparse

from playwright.sync_api import expect, sync_playwright


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--base-url", default="http://127.0.0.1:4173")
parser.add_argument("--browser", help="Chromium executable; otherwise auto-detected")
options, remaining = parser.parse_known_args()
BASE_URL = options.base_url.rstrip("/")


class ShopSmoke(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        executable = options.browser or shutil.which("chromium") or shutil.which("google-chrome")
        cls.browser = cls.playwright.chromium.launch(
            executable_path=executable, headless=True, args=["--no-sandbox"]
        )

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def setUp(self):
        self.context = self.browser.new_context(
            viewport={"width": 1440, "height": 1000}, reduced_motion="reduce"
        )
        self.page = self.context.new_page()
        self.page.set_default_timeout(5000)
        self.errors = []
        self.page.on("pageerror", lambda error: self.errors.append(str(error)))
        self.page.on("console", lambda message: self.errors.append(message.text)
                     if message.type == "error" else None)
        def request_failed(request):
            # Route changes can cancel the mocked lazy iframe before it paints.
            if request.failure == "net::ERR_ABORTED" and request.url.startswith("https://www.google.com/maps?"):
                return
            self.errors.append(f"{request.url}: {request.failure}")
        self.page.on("requestfailed", request_failed)
        self.page.route(re.compile(r"^https://www\.google\.com/maps\?"), lambda route: route.fulfill(
            status=200, content_type="text/html",
            body="<!doctype html><html lang='es'><title>Mapa simulado para pruebas</title>"
                 "<body style='background:#eeece4;color:#304832;font:18px sans-serif;padding:32px'>"
                 "<h1>Mapa simulado para pruebas</h1><p>La conexión real con Google Maps no se valida en esta prueba.</p></body></html>"))
        self.page.goto(BASE_URL + "/")

    def tearDown(self):
        self.context.close()
        self.assertEqual(self.errors, [], "Browser/runtime errors")

    def nav(self, name):
        if name == "Ver catálogo":
            return self.page.locator(".header-inner").get_by_role("link", name=name, exact=True)
        return self.page.get_by_role("navigation", name="Navegación principal").get_by_role(
            "link", name=name, exact=True)

    def card(self, name):
        return self.page.locator(".product-card").filter(
            has=self.page.get_by_role("heading", name=name, exact=True))

    def test_home_structure(self):
        self.assertEqual(
            self.page.get_by_role("navigation", name="Navegación principal")
            .get_by_role("link").all_text_contents(),
            ["Inicio", "Nosotros", "Destacados", "Guía matera", "Visitános"],
        )
        expect(self.nav("Ver catálogo")).to_be_visible()
        expect(self.nav("Ver catálogo")).to_have_attribute("href", "/catalogo")
        expect(self.page.locator("main .product-grid")).to_have_count(1)
        expect(self.page.locator("main .product-card")).to_have_count(5)
        expect(self.page.locator("#categorias")).to_have_count(0)

    def test_catalog_search_gifts_favorites(self):
        self.nav("Ver catálogo").click()
        expect(self.page).to_have_url(BASE_URL + "/catalogo")
        expect(self.page.locator(".product-card")).to_have_count(6)
        search = self.page.get_by_label("Buscar productos en el catálogo")
        search.fill("RAICES seleccion")
        expect(self.page.locator(".product-card")).to_have_count(1)
        expect(self.page.locator(".product-name")).to_have_text("Yerba Raíces Selección")
        self.page.get_by_role("button", name="Limpiar búsqueda", exact=True).focus()
        self.page.keyboard.press("Enter")
        expect(search).to_be_focused()
        expect(self.page.locator(".product-card")).to_have_count(6)
        self.page.get_by_role("group", name="Filtrar por categoría").get_by_role(
            "button", name="Regalos", exact=True).click()
        expect(self.page.locator(".product-card")).to_have_count(1)
        expect(self.page.locator(".product-name")).to_have_text("Set Nuestra Ronda")
        self.card("Set Nuestra Ronda").get_by_role("button", name="Guardar", exact=False).click()
        self.page.get_by_role("button", name="Mis favoritos", exact=False).click()
        self.page.reload()
        expect(self.page.locator(".product-card")).to_have_count(1)
        self.card("Set Nuestra Ronda").get_by_role("button", name="Quitar", exact=False).click()
        expect(self.page.locator(".catalog-empty")).to_be_visible()

    def test_cart_quantities_totals_persist(self):
        self.card("Yerba Raíces Selección").get_by_role("button", name="Agregar", exact=False).click()
        self.nav("Ver catálogo").click()
        self.page.get_by_role("button", name="Abrir carrito,", exact=False).click()
        cart = self.page.get_by_role("dialog", name="Tu próxima ronda", exact=True)
        expect(cart.locator(".cart-total strong")).to_contain_text("7.900")
        plus = cart.get_by_role("button", name="Agregar una unidad de Yerba Raíces Selección", exact=True)
        plus.click()
        expect(plus).to_be_focused()
        expect(cart.locator(".cart-total strong")).to_contain_text("15.800")
        self.page.keyboard.press("Escape")
        self.page.reload()
        expect(self.page.locator(".cart-count")).to_have_text("2")
        self.page.get_by_role("button", name="Abrir carrito,", exact=False).click()
        cart.get_by_role("button", name="Quitar una unidad de Yerba Raíces Selección", exact=True).click()
        expect(cart.locator(".cart-total strong")).to_contain_text("7.900")
        cart.get_by_role("button", name="Eliminar Yerba Raíces Selección del carrito", exact=True).click()
        expect(cart.locator(".empty-cart")).to_be_visible()

    def test_routes_and_repeated_anchor(self):
        self.page.goto(BASE_URL + "/catalogo")
        self.page.reload()
        expect(self.page.locator(".product-card")).to_have_count(6)
        destinations = (("Inicio", "/"), ("Nosotros", "/#nosotros"),
                        ("Destacados", "/#productos"), ("Guía matera", "/#guia"),
                        ("Visitános", "/#ubicacion"))
        for source in ("/catalogo", "/"):
            for name, destination in destinations:
                with self.subTest(source=source, destination=destination):
                    self.page.goto(BASE_URL + source)
                    link = self.nav(name)
                    link.click()
                    expect(self.page).to_have_url(BASE_URL + destination)
                    expect(link).to_have_attribute("aria-current", "page" if destination == "/" else "location")
                    if "#" in destination:
                        target = self.page.locator("#" + destination.split("#")[1])
                        expect(target).to_be_in_viewport()
                        self.page.evaluate("scrollTo(0,0)")
                        link.click()
                        expect(target).to_be_in_viewport()
                    else:
                        self.page.evaluate("scrollTo(0,800)")
                        link.click()
                        self.page.wait_for_function("scrollY === 0")
        self.page.locator(".header-inner .brand").click()
        expect(self.page).to_have_url(BASE_URL + "/")

    def test_mobile_menu_and_responsive_overflow(self):
        self.page.set_viewport_size({"width": 390, "height": 844})
        toggle = self.page.get_by_role("button", name="Abrir menú", exact=True)
        toggle.click()
        menu = self.page.get_by_role("navigation", name="Navegación móvil")
        expect(menu).to_be_visible()
        self.page.keyboard.press("Escape")
        expect(menu).to_be_hidden()
        expect(toggle).to_be_focused()
        expect(self.nav("Ver catálogo")).not_to_be_visible()
        destinations = (("Inicio", "/"), ("Nosotros", "/#nosotros"),
                        ("Destacados", "/#productos"), ("Guía matera", "/#guia"),
                        ("Visitános", "/#ubicacion"))
        for name, destination in destinations:
            with self.subTest(mobile_destination=destination):
                self.page.goto(BASE_URL + "/catalogo")
                toggle.click()
                menu.get_by_role("link", name=name, exact=True).click()
                expect(self.page).to_have_url(BASE_URL + destination)
                expect(menu).to_be_hidden()
                expect(toggle).to_have_attribute("aria-expanded", "false")
        toggle.click()
        menu.get_by_role("link", name="Ver catálogo", exact=True).click()
        expect(self.page).to_have_url(BASE_URL + "/catalogo")
        expect(menu).to_be_hidden()
        toggle.click()
        self.page.set_viewport_size({"width": 1440, "height": 1000})
        expect(menu).to_be_hidden()
        expect(self.nav("Ver catálogo")).to_be_visible()
        for path in ("/", "/catalogo"):
            self.page.goto(BASE_URL + path)
            for width in (320, 390, 641, 768, 1024, 1440):
                with self.subTest(path=path, width=width):
                    self.page.set_viewport_size({"width": width, "height": 844})
                    self.assertTrue(self.page.evaluate(
                        "document.documentElement.scrollWidth <= innerWidth"))

    def test_mate_guide_keyboard_and_catalog_links(self):
        guide = self.page.locator("#guia")
        tabs = guide.get_by_role("tab")
        panels = guide.get_by_role("tabpanel")
        expect(tabs).to_have_count(3)
        expect(guide.get_by_role("tablist")).to_have_attribute("aria-orientation", "vertical")
        self.page.set_viewport_size({"width": 390, "height": 844})
        expect(guide.get_by_role("tablist")).to_have_attribute("aria-orientation", "horizontal")
        self.page.set_viewport_size({"width": 1440, "height": 1000})
        expect(guide.get_by_role("tablist")).to_have_attribute("aria-orientation", "vertical")
        tabs.nth(0).focus()
        for key, index in (("ArrowDown", 1), ("ArrowUp", 0), ("ArrowRight", 1), ("End", 2), ("ArrowRight", 0),
                           ("ArrowLeft", 2), ("Home", 0)):
            self.page.keyboard.press(key)
            expect(tabs.nth(index)).to_be_focused()
            expect(tabs.nth(index)).to_have_attribute("aria-selected", "true")
            expect(tabs.nth(index)).to_have_attribute("tabindex", "0")
            expect(panels).to_have_count(1)
            self.assertEqual(panels.get_attribute("id"), tabs.nth(index).get_attribute("aria-controls"))
        for index, category, count in ((0, "Mates", 1), (1, "Yerbas", 2), (2, "Mates", 1)):
            self.page.goto(BASE_URL + "/#guia")
            self.page.locator("#guia").get_by_role("tab").nth(index).click()
            self.page.locator("#guia").get_by_role("tabpanel").get_by_role("link").click()
            expect(self.page).to_have_url(BASE_URL + "/catalogo?categoria=" + category)
            expect(self.page.locator(".product-card")).to_have_count(count)

    def test_faq_keyboard_and_gift_links(self):
        faq = self.page.locator("#preguntas-frecuentes")
        summaries = faq.locator("summary")
        self.assertGreater(summaries.count(), 1)
        summaries.nth(0).focus()
        self.page.keyboard.press("Enter")
        expect(faq.locator("details[open]")).to_have_count(1)
        expect(faq.locator(".faq-answer").nth(0)).to_be_visible()
        summaries.nth(1).focus()
        self.page.keyboard.press("Enter")
        expect(faq.locator("details[open]")).to_have_count(1)
        expect(faq.locator(".faq-answer").nth(0)).not_to_be_visible()
        self.page.keyboard.press("Enter")
        expect(faq.locator("details[open]")).to_have_count(0)
        self.page.locator(".gift-section").get_by_role("link", name="Encontrá tu regalo", exact=False).click()
        expect(self.page).to_have_url(BASE_URL + "/catalogo?categoria=Regalos")
        expect(self.page.locator(".product-card")).to_have_count(1)
        expect(self.page.locator(".product-name")).to_have_text("Set Nuestra Ronda")

    def test_location_last_section_and_map_state(self):
        location = self.page.locator("#ubicacion")
        self.assertTrue(self.page.locator("main").evaluate(
            "e => [...e.querySelectorAll('section')].at(-1).id === 'ubicacion'"
            " && e.nextElementSibling.tagName === 'FOOTER'"))
        query = "Avenida Este 12, General Alvear, Mendoza, Argentina"
        frame = location.locator("iframe")
        expect(frame).to_have_attribute("loading", "lazy")
        expect(frame).to_have_attribute("title", "Ubicación de Raíces: " + query)
        self.assertEqual(parse_qs(urlparse(frame.get_attribute("src")).query),
                         {"q": [query], "output": ["embed"]})
        expect(location).to_contain_text("8:00 a 12:00 y 17:00 a 21:00")
        for label in ("Cómo llegar", "Abrir en Google Maps"):
            link = location.get_by_role("link", name=label, exact=False)
            expect(link).to_have_attribute("target", "_blank")
            self.assertTrue({"noopener", "noreferrer"}.issubset(set(link.get_attribute("rel").split())))
            self.assertEqual(parse_qs(urlparse(link.get_attribute("href")).query),
                             {"api": ["1"], "query": [query]})
        frame.scroll_into_view_if_needed()
        expect(self.page.frame_locator("#ubicacion iframe").get_by_role(
            "heading", name="Mapa simulado para pruebas")).to_be_visible()

    def test_about_payment_and_single_page_sections(self):
        about = self.page.locator("#quienes-somos")
        expect(about).to_contain_text("General Alvear")
        expect(about).to_contain_text("Raíces nació")
        expect(about.locator(".about-value")).to_have_count(3)
        expect(about.locator(".offering")).to_have_count(4)
        expect(self.page.locator("#medios-de-pago .payment-method h3")).to_have_text(
            ["Efectivo", "Transferencia", "Mercado Pago", "Tarjetas"])
        section_ids = ["#quienes-somos", "#guia", "#medios-de-pago", "#preguntas-frecuentes", "#ubicacion"]
        for selector in section_ids:
            expect(self.page.locator("main " + selector)).to_have_count(1)
        for category, count in (("Yerbas", 2), ("Mates", 1), ("Accesorios", 2), ("Regalos", 1)):
            about.locator(f'a[href="/catalogo?categoria={category}"]').click()
            expect(self.page).to_have_url(BASE_URL + "/catalogo?categoria=" + category)
            expect(self.page.locator(".product-card")).to_have_count(count)
            for selector in section_ids:
                expect(self.page.locator("main " + selector)).to_have_count(0)
            self.page.goto(BASE_URL + "/")

    def test_footer_hash_links_repeat_and_catalog_query_focus(self):
        self.nav("Ver catálogo").click()
        for label, target in (("Preguntas frecuentes", "preguntas-frecuentes"),
                              ("Entregas", "faq-envios"), ("Cambios y devoluciones", "faq-cambios")):
            link = self.page.locator("footer").get_by_role("link", name=label, exact=True)
            link.click()
            expect(self.page).to_have_url(BASE_URL + "/#" + target)
            section = self.page.locator("#" + target)
            expect(section).to_be_in_viewport()
            if target.startswith("faq-"):
                self.assertTrue(section.evaluate("e=>e.closest('details').open"))
            self.page.evaluate("scrollTo(0,0)")
            link.click()
            expect(section).to_be_in_viewport()
        self.nav("Ver catálogo").click()
        search = self.page.get_by_label("Buscar productos en el catálogo")
        search.scroll_into_view_if_needed()
        self.page.evaluate("scrollTo(0,200)")
        search.focus()
        initial_scroll = self.page.evaluate("scrollY")
        self.assertGreater(initial_scroll, 0)
        search.fill("RAICES")
        expect(self.page.locator(".product-card")).to_have_count(1)
        expect(search).to_be_focused()
        self.assertAlmostEqual(self.page.evaluate("scrollY"), initial_scroll, delta=2)


if __name__ == "__main__":
    unittest.main(argv=[sys.argv[0], *remaining], verbosity=2)
