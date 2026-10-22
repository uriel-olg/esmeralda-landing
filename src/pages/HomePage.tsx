import { Benefits } from '../components/Benefits';
import { Hero } from '../components/Hero';
import { Newsletter } from '../components/Newsletter';
import { ProductsSection } from '../components/ProductsSection';
import { StorySection } from '../components/StorySection';
import { MateGuide } from '../components/MateGuide';
import { GiftSection } from '../components/GiftSection';
import { FAQSection } from '../components/FAQSection';
import { LocationSection } from '../components/LocationSection';
import { AboutSection } from '../components/AboutSection';
import { PaymentMethods } from '../components/PaymentMethods';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <Benefits />
      <StorySection />
      <AboutSection />
      <MateGuide />
      <GiftSection />
      <PaymentMethods />
      <FAQSection />
      <Newsletter />
      <LocationSection />
    </>
  );
}
