import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import EngagementHero from './components/EngagementHero';
import AnnuaireSection from './components/AnnuaireSection';
import ProjetsSection from './components/ProjetsSection';
import BenevolatsSection from './components/BenevolatsSection';
import ConsultationsSection from './components/ConsultationsSection';

const EngagementPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <EngagementHero />
      <AnnuaireSection />
      <ProjetsSection />
      <BenevolatsSection />
      <ConsultationsSection />
      <Footer />
    </div>
  );
};

export default EngagementPage;
