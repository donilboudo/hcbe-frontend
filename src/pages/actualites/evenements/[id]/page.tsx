import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/feature/Navbar';
import Footer from '../../../../components/feature/Footer';
import { buildApiUrl } from '../../../../lib/api/base-url';

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
  organizerName?: string;
  organizerEmail?: string;
  capacity?: number;
  registeredCount?: number;
  tags?: string[];
}

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadEvent(id);
    }
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      const response = await fetch(buildApiUrl(`/api/events/${eventId}`));
      const result = await response.json();
      if (result.success) {
        setEvent(result.data);
      } else {
        // Événement non trouvé
        setTimeout(() => navigate('/actualites/evenements'), 2000);
      }
    } catch (error) {
      console.error('Error loading event:', error);
      setTimeout(() => navigate('/actualites/evenements'), 2000);
    } finally {
      setIsLoading(false);
    }
  };

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

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
            <i className="ri-calendar-line mr-2"></i>
            À venir
          </span>
        );
      case 'ongoing':
        return (
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <i className="ri-live-line mr-2"></i>
            En cours
          </span>
        );
      case 'past':
        return (
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            <i className="ri-check-line mr-2"></i>
            Terminé
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-calendar-line text-6xl text-gray-400 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Événement non trouvé</h3>
          <p className="text-gray-600 mb-4">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Image */}
      <div className="relative h-96 bg-gradient-to-r from-emerald-600 to-emerald-800 pt-20">
        {event.imageUrl && (
          <>
            <img
              src={event.imageUrl}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-800/80"></div>
          </>
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div className="text-white">
            <nav className="text-sm mb-4 opacity-90">
              <Link to="/" className="hover:underline">Accueil</Link>
              <span className="mx-2">/</span>
              <Link to="/actualites" className="hover:underline">Actualités</Link>
              <span className="mx-2">/</span>
              <Link to="/actualites/evenements" className="hover:underline">Événements</Link>
              <span className="mx-2">/</span>
              <span>{event.title}</span>
            </nav>
            
            <div className="flex items-center gap-3 mb-4">
              {getStatusBadge(event.status)}
              {event.isVirtual && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <i className="ri-video-line mr-2"></i>
                  Virtuel
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {event.tags && event.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Thématiques</h2>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6 space-y-6">
              {/* Date & Time */}
              <div>
                <div className="flex items-center text-gray-600 mb-2">
                  <i className="ri-calendar-line text-emerald-600 text-xl mr-3"></i>
                  <span className="font-medium">Date et heure</span>
                </div>
                <p className="text-gray-900 ml-9">{formatDate(event.date)}</p>
              </div>

              {/* Location */}
              {!event.isVirtual && event.location && (
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <i className="ri-map-pin-line text-emerald-600 text-xl mr-3"></i>
                    <span className="font-medium">Lieu</span>
                  </div>
                  <p className="text-gray-900 ml-9">{event.location}</p>
                </div>
              )}

              {/* Virtual Event */}
              {event.isVirtual && (
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <i className="ri-video-line text-emerald-600 text-xl mr-3"></i>
                    <span className="font-medium">Format</span>
                  </div>
                  <p className="text-gray-900 ml-9">Événement en ligne</p>
                </div>
              )}

              {/* Capacity */}
              {event.capacity && (
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <i className="ri-group-line text-emerald-600 text-xl mr-3"></i>
                    <span className="font-medium">Places disponibles</span>
                  </div>
                  <p className="text-gray-900 ml-9">
                    {event.registeredCount || 0} / {event.capacity} inscrits
                  </p>
                  <div className="ml-9 mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${((event.registeredCount || 0) / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Organizer */}
              {event.organizerName && (
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <i className="ri-user-line text-emerald-600 text-xl mr-3"></i>
                    <span className="font-medium">Organisateur</span>
                  </div>
                  <p className="text-gray-900 ml-9">{event.organizerName}</p>
                  {event.organizerEmail && (
                    <a
                      href={`mailto:${event.organizerEmail}`}
                      className="text-emerald-600 hover:text-emerald-700 ml-9 text-sm"
                    >
                      {event.organizerEmail}
                    </a>
                  )}
                </div>
              )}

              {/* Registration Button */}
              {event.status !== 'past' && event.registrationUrl && (
                <div className="pt-4 border-t border-gray-200">
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                  >
                    <i className="ri-ticket-line mr-2"></i>
                    S'inscrire à l'événement
                  </a>
                </div>
              )}

              {/* Share */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm font-medium mb-3">Partager</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                    <i className="ri-facebook-line"></i>
                  </button>
                  <button className="flex-1 px-4 py-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors text-sm">
                    <i className="ri-twitter-line"></i>
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                    <i className="ri-mail-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            to="/actualites/evenements"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Retour aux événements
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EventDetailPage;
