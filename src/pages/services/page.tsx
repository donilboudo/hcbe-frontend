import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import ServicesHero from './components/ServicesHero';
import ComitesSection from './components/ComitesSection';
import BoursesSection from './components/BoursesSection';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ServicesHero />
      <ComitesSection />
      <BoursesSection />
      <Footer />
    </div>
  );
};

export default ServicesPage;
