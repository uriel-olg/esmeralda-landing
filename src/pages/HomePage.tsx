import { Benefits } from '../components/Benefits';
import { Hero } from '../components/Hero';
import { Newsletter } from '../components/Newsletter';
import { ProductsSection } from '../components/ProductsSection';
import { StorySection } from '../components/StorySection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <Benefits />
      <StorySection />
      <Newsletter />
    </>
  );
}
