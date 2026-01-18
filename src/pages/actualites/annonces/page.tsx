import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import AnnoncesExemples from '../components/AnnoncesExemples';

export const AnnoncesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Communiqué Officiel',
    'Éducation',
    'Événement',
    'Service',
    'Solidarité',
    'Formation',
    'Annonce',
    'Partenariat'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-4">
            <Link to="/" className="hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/actualites" className="hover:underline">Actualités et Événements</Link>
            <span className="mx-2">/</span>
            <span>Annonces et Communiqués</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Annonces et Communiqués</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Restez informé des dernières nouvelles et annonces officielles du HCBE Canada
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              {category === 'all' ? 'Toutes les catégories' : category}
            </button>
          ))}
        </div>

        {/* News List */}
        <AnnoncesExemples selectedCategory={selectedCategory} />
      </div>
      
      <Footer />
    </div>
  );
};

export default AnnoncesPage;
