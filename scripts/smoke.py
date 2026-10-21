#!/usr/bin/env python3
"""Optional browser smoke checks: Python 3 + Playwright + Chromium.

Start the app separately, then run:
    python3 scripts/smoke.py --base-url http://127.0.0.1:4173
"""
import argparse
import shutil
import sys
import unittest

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
        self.page.on("requestfailed", lambda request: self.errors.append(
            f"{request.url}: {request.failure}"))
        self.page.goto(BASE_URL + "/")

    def tearDown(self):
        self.context.close()
        self.assertEqual(self.errors, [], "Browser/runtime errors")

    def nav(self, name):
        return self.page.get_by_role("navigation", name="Navegación principal").get_by_role(
            "link", name=name, exact=True)

    def card(self, name):
        return self.page.locator(".product-card").filter(
            has=self.page.get_by_role("heading", name=name, exact=True))

    def test_home_structure(self):
        self.assertEqual(
            self.page.get_by_role("navigation", name="Navegación principal")
            .get_by_role("link").all_text_contents(),
            ["Home", "Productos", "Nosotros", "Catálogo"],
        )
        expect(self.page.locator("main .product-grid")).to_have_count(1)
        expect(self.page.locator("main .product-card")).to_have_count(5)
        expect(self.page.locator("#categorias")).to_have_count(0)

    def test_catalog_search_gifts_favorites(self):
        self.nav("Catálogo").click()
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
        self.nav("Catálogo").click()
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
        self.nav("Productos").click()
        expect(self.page).to_have_url(BASE_URL + "/#productos")
        expect(self.page.locator("#productos")).to_be_in_viewport()
        self.page.evaluate("scrollTo(0, 0)")
        self.nav("Productos").click()
        expect(self.page.locator("#productos")).to_be_in_viewport()
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
        toggle.click()
        menu.get_by_role("link", name="Catálogo", exact=True).click()
        expect(self.page).to_have_url(BASE_URL + "/catalogo")
        expect(menu).to_be_hidden()
        for path in ("/", "/catalogo"):
            self.page.goto(BASE_URL + path)
            for width in (320, 390, 768, 1024, 1440):
                with self.subTest(path=path, width=width):
                    self.page.set_viewport_size({"width": width, "height": 844})
                    self.assertTrue(self.page.evaluate(
                        "document.documentElement.scrollWidth <= innerWidth"))


if __name__ == "__main__":
    unittest.main(argv=[sys.argv[0], *remaining], verbosity=2)
