import React from 'react';
import { Link } from 'react-router-dom';

interface News {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  isPinned: boolean;
}

const annoncesExemples: News[] = [
  {
    id: '1',
    title: 'Nouvelle Procédure de Demande de Passeport Burkinabè',
    content: 'Le Consulat du Burkina Faso annonce la mise en place d\'une nouvelle procédure simplifiée pour la demande de passeport. Les citoyens burkinabè résidant au Canada peuvent désormais soumettre leur demande en ligne via le portail consulaire. Les documents requis incluent: preuve de citoyenneté, photos d\'identité récentes, formulaire de demande complété. Le délai de traitement est estimé à 4-6 semaines.',
    category: 'Communiqué Officiel',
    author: 'Secrétariat HCBE',
    publishedAt: '2024-01-15',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
    isPinned: true
  },
  {
    id: '2',
    title: 'Programme de Bourses d\'Études 2024',
    content: 'Le HCBE Canada est fier d\'annoncer le lancement de son programme de bourses d\'études pour l\'année 2024. Nous offrons 10 bourses d\'une valeur de 2 000$ chacune aux étudiants burkinabè inscrits dans des établissements d\'enseignement supérieur canadiens. Les critères d\'éligibilité comprennent: excellence académique (moyenne minimale de 3.0), engagement communautaire, projet de développement pour le Burkina Faso. Date limite de candidature: 31 mars 2024.',
    category: 'Éducation',
    author: 'Comité Éducation',
    publishedAt: '2024-01-10',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    isPinned: true
  },
  {
    id: '3',
    title: 'Assemblée Générale Annuelle 2024',
    content: 'Nous invitons tous les membres du HCBE Canada à participer à notre Assemblée Générale Annuelle qui se tiendra le samedi 16 mars 2024 à 14h00 au Centre Communautaire de Toronto. À l\'ordre du jour: rapport d\'activités 2023, présentation des comptes, élections du nouveau conseil d\'administration, orientations stratégiques 2024-2026. Votre présence et participation sont essentielles pour l\'avenir de notre communauté.',
    category: 'Événement',
    author: 'Bureau Exécutif',
    publishedAt: '2024-01-05',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    isPinned: false
  },
  {
    id: '4',
    title: 'Services de Légalisation de Documents',
    content: 'Le HCBE Canada, en partenariat avec le Consulat, propose maintenant un service de légalisation de documents pour faciliter vos démarches administratives. Ce service comprend: authentification de diplômes, certification de documents d\'état civil, légalisation pour usage au Burkina Faso. Les rendez-vous se tiennent tous les mardis et jeudis de 10h à 15h. Frais: 50$ par document. Réservation obligatoire.',
    category: 'Service',
    author: 'Département Services',
    publishedAt: '2023-12-20',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    isPinned: false
  },
  {
    id: '5',
    title: 'Collecte de Fonds pour les Déplacés Internes',
    content: 'Face à la situation humanitaire au Burkina Faso, le HCBE Canada lance une campagne de collecte de fonds pour venir en aide aux personnes déplacées internes. L\'objectif est de collecter 50 000$ pour fournir des kits alimentaires, des articles d\'hygiène et des fournitures scolaires. Vous pouvez contribuer par virement bancaire ou via notre plateforme en ligne. Chaque don fait la différence. Ensemble, soutenons nos compatriotes.',
    category: 'Solidarité',
    author: 'Comité Solidarité',
    publishedAt: '2023-12-15',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800',
    isPinned: false
  },
  {
    id: '6',
    title: 'Atelier: Entrepreneuriat et Création d\'Entreprise au Canada',
    content: 'Le HCBE organise un atelier pratique sur l\'entrepreneuriat et la création d\'entreprise au Canada. Au programme: structures juridiques, financement et subventions disponibles, fiscalité pour entrepreneurs, marketing et développement commercial. Animé par des entrepreneurs burkinabè à succès et des experts en développement des affaires. Date: 27 janvier 2024, 13h-17h. Inscription gratuite mais places limitées.',
    category: 'Formation',
    author: 'Comité Entrepreneuriat',
    publishedAt: '2023-12-10',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
    isPinned: false
  },
  {
    id: '7',
    title: 'Nouvelle Section Jeunesse du HCBE',
    content: 'Nous sommes heureux d\'annoncer la création de la Section Jeunesse du HCBE Canada, dédiée aux membres de 16 à 35 ans. Cette section vise à favoriser l\'engagement des jeunes, préserver le patrimoine culturel burkinabè, créer des opportunités de mentorat et de réseautage. Première réunion le 3 février 2024. Si vous souhaitez vous impliquer ou proposer des projets, contactez jeunesse@hcbecanada.org',
    category: 'Annonce',
    author: 'Coordination Jeunesse',
    publishedAt: '2023-12-05',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    isPinned: false
  },
  {
    id: '8',
    title: 'Partenariat avec Immigration Canada',
    content: 'Le HCBE Canada a signé un protocole d\'accord avec Immigration, Réfugiés et Citoyenneté Canada (IRCC) pour faciliter l\'intégration des nouveaux arrivants burkinabè. Ce partenariat permettra d\'offrir: séances d\'information sur l\'immigration, aide à la recherche d\'emploi, cours de français/anglais, accompagnement administratif. Un agent d\'IRCC sera disponible à nos bureaux le premier mercredi de chaque mois.',
    category: 'Partenariat',
    author: 'Direction HCBE',
    publishedAt: '2023-11-28',
    imageUrl: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800',
    isPinned: false
  }
];

interface AnnoncesExemplesProps {
  selectedCategory: string;
}

export const AnnoncesExemples: React.FC<AnnoncesExemplesProps> = ({ selectedCategory }) => {
  const filteredNews = selectedCategory === 'all' 
    ? annoncesExemples 
    : annoncesExemples.filter(n => n.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (filteredNews.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <i className="ri-newspaper-line text-6xl text-gray-400 mb-4"></i>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aucune annonce dans cette catégorie
        </h3>
        <p className="text-gray-600">
          Consultez d'autres catégories pour plus d'actualités
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredNews.map((item) => (
        <article
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="md:flex">
            {item.imageUrl && (
              <div className="md:w-1/3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
            )}
            <div className={`p-6 ${item.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
              <div className="flex items-center gap-3 mb-3">
                {item.isPinned && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    <i className="ri-pushpin-line mr-1"></i>
                    Épinglé
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {item.category}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {item.title}
              </h2>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <i className="ri-user-line mr-1"></i>
                  {item.author}
                </span>
                <span className="flex items-center">
                  <i className="ri-calendar-line mr-1"></i>
                  {formatDate(item.publishedAt)}
                </span>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">
                {item.content}
              </p>

              <button
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => alert('Fonctionnalité de détail à implémenter')}
              >
                Lire la suite
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default AnnoncesExemples;