import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import ZonesSection from './components/ZonesSection';
import MissionVisionSection from './components/MissionVisionSection';
import UpcomingEventsSection from './components/UpcomingEventsSection';
import CTASection from './components/CTASection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Navbar />
      <HeroSection />
      <MissionVisionSection />
      <ZonesSection />
      <UpcomingEventsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
