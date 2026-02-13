import HeroSection from '@/components/home/HeroSection';
import ServiceGrid from '@/components/home/ServiceGrid';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import CTABanner from '@/components/home/CTABanner';
import FAQ from '@/components/home/FAQ';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceGrid />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
