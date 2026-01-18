import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import { buildApiUrl } from '../../../lib/api/base-url';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  isVirtual: boolean;
  registrationUrl?: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

export const EvenementsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ongoing'>('all');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/events'));
      const result = await response.json();
      if (result.success) {
        // Filtrer seulement les événements futurs et en cours
        const futureEvents = result.data
          .filter((event: Event) => event.status !== 'past')
          .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(futureEvents);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.status === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-4">
            <Link to="/" className="hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/actualites" className="hover:underline">Actualités et Événements</Link>
            <span className="mx-2">/</span>
            <span>Événements à Venir</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Événements à Venir</h1>
          <p className="text-xl text-emerald-100 max-w-3xl">
            Découvrez nos prochains événements et rejoignez la communauté burkinabè au Canada
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-emerald-50'
            }`}
          >
            Tous les événements
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'upcoming'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-emerald-50'
            }`}
          >
            <i className="ri-calendar-line mr-2"></i>
            À venir
          </button>
          <button
            onClick={() => setFilter('ongoing')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'ongoing'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-emerald-50'
            }`}
          >
            <i className="ri-live-line mr-2"></i>
            En cours
          </button>
        </div>

        {/* Events List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <i className="ri-calendar-line text-6xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun événement trouvé
            </h3>
            <p className="text-gray-600">
              {filter === 'upcoming' && 'Aucun événement à venir pour le moment.'}
              {filter === 'ongoing' && 'Aucun événement en cours actuellement.'}
              {filter === 'all' && 'Consultez régulièrement cette page pour ne manquer aucun événement.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {event.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {event.status === 'ongoing' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        <i className="ri-live-line mr-1"></i>
                        En cours
                      </span>
                    )}
                    {event.isVirtual && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <i className="ri-video-line mr-1"></i>
                        Virtuel
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <i className="ri-calendar-line text-emerald-600 mr-2"></i>
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    {!event.isVirtual && event.location && (
                      <div className="flex items-center text-gray-700">
                        <i className="ri-map-pin-line text-emerald-600 mr-2"></i>
                        <span className="text-sm">{event.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/actualites/evenements/${event.id}`}
                      className="flex-1 text-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Détails
                    </Link>
                    {event.registrationUrl && (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-2 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                      >
                        S'inscrire
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default EvenementsPage;
