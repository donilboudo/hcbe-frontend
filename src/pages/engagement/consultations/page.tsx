import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import ConsultationsSection from '../components/ConsultationsSection';

const ConsultationsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Votre Opinion Compte
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Participez aux consultations et sondages pour façonner l'avenir de notre communauté. 
              Votre voix est essentielle pour orienter nos actions et améliorer nos services.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ConsultationsSection />
      
      <Footer />
    </div>
  );
};

export default ConsultationsPage;