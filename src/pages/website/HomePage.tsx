import HomeLayout from "@/layouts/HomeLayout";
import BannerSection from "./components/BannerSection";
import FeaturedCandidateSection from "./components/FeatureCandidateSection";
import FeaturedEmployersSection from "./components/FeaturedEmployersSection";
import FeaturedJobsSection from "./components/FeaturedJobsSection";
import HeroSection from "./components/HeroSection";
import CTASection from "./components/CTASection";

const HomePage = () => {
  return (
    <HomeLayout>
      <HeroSection />
      <BannerSection />
      <FeaturedEmployersSection />
      <FeaturedJobsSection />
      <FeaturedCandidateSection />
      <CTASection />
    </HomeLayout>
  );
};

export default HomePage;
