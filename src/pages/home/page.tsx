import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import ZonesSection from './components/ZonesSection';
import MissionVisionSection from './components/MissionVisionSection';
import HistoireSection from './components/HistoireSection';
import EquipeSection from './components/EquipeSection';
import DocumentsSection from './components/DocumentsSection';
import CTASection from './components/CTASection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ZonesSection />
      <MissionVisionSection />
      <HistoireSection />
      <EquipeSection />
      <DocumentsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
