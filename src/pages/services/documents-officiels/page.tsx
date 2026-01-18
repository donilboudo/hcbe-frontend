import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import DocumentsSection from '../../home/components/DocumentsSection';

const DocumentsOfficielsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <i className="ri-folder-line"></i>
              <span className="font-semibold text-sm">Services et Ressources</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Documents Officiels
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Consultez et téléchargez les documents officiels régissant le fonctionnement du HCBE Canada
            </p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <DocumentsSection />
      
      <Footer />
    </div>
  );
};

export default DocumentsOfficielsPage;
