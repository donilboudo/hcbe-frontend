import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import ActualitesHero from './components/ActualitesHero';
import AgendaSection from './components/AgendaSection';
import CommuniquesSection from './components/CommuniquesSection';
import GalerieSection from './components/GalerieSection';
import NewsletterSection from './components/NewsletterSection';

const ActualitesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ActualitesHero />
      <AgendaSection />
      <CommuniquesSection />
      <GalerieSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default ActualitesPage;
