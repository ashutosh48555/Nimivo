import HeroSection from '@/components/home/HeroSection';
import SpotlightCarousel from '@/components/home/SpotlightCarousel';
import ServiceCategoryRow from '@/components/home/ServiceCategoryRow';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import CTABanner from '@/components/home/CTABanner';
import FAQ from '@/components/home/FAQ';
import {
  MOST_BOOKED,
  CLEANING_SERVICES,
  APPLIANCE_SERVICES,
  REPAIR_SERVICES,
  SALON_MEN,
  SALON_WOMEN,
} from '@/lib/constants';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SpotlightCarousel />

      <div id="services">
      <ServiceCategoryRow
        title="Most booked services"
        items={MOST_BOOKED}
      />

      <ServiceCategoryRow
        title="Cleaning Essentials"
        subtitle="Monthly cleaning essential services"
        seeAllLink="/book"
        items={CLEANING_SERVICES}
      />

      <ServiceCategoryRow
        title="Appliance Service & Repair"
        seeAllLink="/book"
        items={APPLIANCE_SERVICES}
      />

      <ServiceCategoryRow
        title="Home Repair & Installation"
        seeAllLink="/book"
        items={REPAIR_SERVICES}
      />

      <ServiceCategoryRow
        title="Salon for Men"
        subtitle="Grooming essentials"
        seeAllLink="/book"
        items={SALON_MEN}
      />

      <ServiceCategoryRow
        title="Beauty & Spa for Women"
        subtitle="Self-care at your doorstep"
        seeAllLink="/book"
        items={SALON_WOMEN}
      />
      </div>

      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
