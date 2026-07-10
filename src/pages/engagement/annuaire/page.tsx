import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import AnnuaireSection from '../components/AnnuaireSection';

const AnnuairePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="mb-5 text-balance break-words text-3xl font-bold leading-tight sm:mb-6 sm:text-4xl md:text-5xl">
              Annuaire des Associations
            </h1>
            <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl">
              Découvrez les associations burkinabè actives au Canada. 
              Trouvez la communauté qui vous correspond et rejoignez-nous dans nos actions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <AnnuaireSection />
      
      <Footer />
    </div>
  );
};

export default AnnuairePage;