import BannerSection from "./components/BannerSection";
import FeaturedEmployersSection from "./components/FeaturedEmployersSection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <BannerSection />
      <FeaturedEmployersSection />
    </div>
  );
};

export default HomePage;
