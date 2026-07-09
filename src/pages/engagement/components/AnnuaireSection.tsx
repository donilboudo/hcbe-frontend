import { useState, useEffect } from 'react';
import { associationsApi } from '../../../lib/api/associations';
import type { Association } from '../../../lib/api/types';

const AnnuaireSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('Toutes');
  const [associations, setAssociations] = useState<Association[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAssociations();
  }, []);

  const loadAssociations = async () => {
    try {
      setIsLoading(true);
      const response = await associationsApi.getAssociations();
      if (response.success && response.data) {
        setAssociations(response.data);
      } else {
        setError('Failed to load associations');
      }
    } catch (error) {
      console.error('Error loading associations:', error);
      setError('Error loading associations');
    } finally {
      setIsLoading(false);
    }
  };

  // Convert backend Association to display format
  const formatAssociationForDisplay = (association: Association) => ({
    id: association.id,
    nom: association.name,
    province: association.province,
    ville: association.city,
    description: association.description || 'Description à venir',
    domaines: association.domains,
    contact: association.contact || 'Contact à confirmer',
    telephone: association.phone || 'Téléphone à confirmer',
    president: association.president || 'Président à confirmer',
    membres: association.memberCount || 'Membres à confirmer',
    annee: association.foundedYear?.toString() || 'Année à confirmer',
    image: association.imageUrl || 'https://readdy.ai/api/search-image?query=Professional%20association%20community%20gathering&width=600&height=400&seq=assoc-default&orientation=landscape',
  });

  const displayAssociations = associations.map(formatAssociationForDisplay);

  // Generate provinces dynamically from actual associations
  const getUniqueProvinces = () => {
    const provinces = new Set<string>();
    associations.forEach(association => provinces.add(association.province));
    return ['Toutes', ...Array.from(provinces).sort()];
  };

  const provinces = getUniqueProvinces();

  const filteredAssociations = displayAssociations.filter(assoc => {
    const matchesSearch = assoc.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assoc.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assoc.domaines.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProvince = selectedProvince === 'Toutes' || assoc.province === selectedProvince;
    return matchesSearch && matchesProvince;
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full mb-4">
            <i className="ri-building-line text-emerald-600"></i>
            <span className="text-emerald-600 font-semibold text-sm">Annuaire des Associations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Associations Burkinabè au Canada
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez et connectez-vous avec les associations burkinabè à travers le Canada
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                type="text"
                placeholder="Rechercher par nom, ville ou domaine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
              />
            </div>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm font-medium cursor-pointer"
            >
              {provinces.map(prov => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg inline-block">
              {error}
            </div>
          </div>
        )}

        {!isLoading && !error && filteredAssociations.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl">🏢</span>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune association trouvée</h3>
            <p className="mt-2 text-gray-500">
              {selectedProvince === 'Toutes' 
                ? "Aucune association n'est actuellement répertoriée." 
                : `Aucune association pour la province sélectionnée.`}
            </p>
          </div>
        )}

        {!isLoading && !error && filteredAssociations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAssociations.map((assoc) => (
            <div
              key={assoc.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="relative h-56 w-full">
                <img
                  src={assoc.image}
                  alt={assoc.nom}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-bold">
                    {assoc.province}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{assoc.nom}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <i className="ri-map-pin-line mr-2 text-emerald-600"></i>
                  <span>{assoc.ville}, {assoc.province}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {assoc.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {assoc.domaines.map((domaine, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {domaine}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center text-gray-600">
                    <i className="ri-user-line mr-2 text-emerald-600 w-5 h-5 flex items-center justify-center"></i>
                    <span>{assoc.president}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="ri-team-line mr-2 text-emerald-600 w-5 h-5 flex items-center justify-center"></i>
                    <span>{assoc.membres} membres</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="ri-calendar-line mr-2 text-emerald-600 w-5 h-5 flex items-center justify-center"></i>
                    <span>Fondée en {assoc.annee}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`mailto:${assoc.contact}`}
                    className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors text-center whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-mail-line mr-2"></i>
                    Contacter
                  </a>
                  <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors cursor-pointer">
                    <i className="ri-information-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Remove the old empty state since we have a new one with loading/error handling */}
      </div>
    </section>
  );
};

export default AnnuaireSection;
