import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import ProjetsSection from '../components/ProjetsSection';

const ProjetsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Projets
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Découvrez nos initiatives de développement au Burkina Faso et nos projets 
              d'intégration et de soutien communautaire au Canada.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ProjetsSection />
      
      <Footer />
    </div>
  );
};

export default ProjetsPage;