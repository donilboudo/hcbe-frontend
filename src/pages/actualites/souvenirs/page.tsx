import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import GalerieSection from '../components/GalerieSection';

export const SouvenirsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-4">
            <Link to="/" className="hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/actualites" className="hover:underline">Actualités et Événements</Link>
            <span className="mx-2">/</span>
            <span>Souvenirs de nos Événements</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Souvenirs de nos Événements</h1>
          <p className="text-xl text-amber-100 max-w-3xl">
            Revivez les moments forts de la communauté burkinabè au Canada
          </p>
        </div>
      </div>

      {/* Galerie Section */}
      <GalerieSection />

      {/* Info Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="ri-camera-line text-amber-600 text-2xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Partagez vos photos
              </h3>
              <p className="text-amber-800">
                Vous avez participé à un de nos événements et souhaitez partager vos photos ? 
                Contactez-nous à <a href="mailto:media@hcbecanada.org" className="underline font-medium">media@hcbecanada.org</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SouvenirsPage;
