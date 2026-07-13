import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../../lib/api/events';
import type { Event } from '../../../lib/api/types';
import { localized } from '../../../lib/i18n/localized';
import { getEventTypeLabelKey } from '../../../lib/news/category-styles';

const AgendaSection = () => {
  const { t, i18n } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState('tous');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventsApi.getEvents();
      if (response.success && response.data) {
        // Filter to only show active/public events
        const publicEvents = response.data.filter(event => 
          event.status === 'Active' || event.status === 'À venir'
        );
        setEvents(publicEvents);
      } else {
        setError('Failed to load events');
      }
    } catch (error) {
      console.error('Error loading events:', error);
      setError('Error loading events');
    } finally {
      setIsLoading(false);
    }
  };

  // Convert backend Event to display format
  const formatEventForDisplay = (event: Event) => {
    const title = localized(event.title, event.titleEn, i18n.language);
    const description = localized(event.description, event.descriptionEn, i18n.language);
    const location = localized(event.location, event.locationEn, i18n.language);
    const typeKey = getEventTypeLabelKey(event.type);
    return {
      id: event.id,
      titre: title,
      date: event.date.split('T')[0],
      heure: new Date(event.date).toLocaleTimeString(
        i18n.language.startsWith('en') ? 'en-CA' : 'fr-CA',
        { hour: '2-digit', minute: '2-digit' },
      ),
      lieu: location || 'Lieu à confirmer',
      adresse: location || 'Adresse à confirmer',
      type: typeKey ? t(typeKey) : event.type || 'HCBE',
      description: description || 'Description à venir',
      descriptionComplete: description || 'Description complète à venir',
      image: event.imageUrl || 'https://readdy.ai/api/search-image?query=Professional%20business%20event%20with%20community%20gathering&width=600&height=400&seq=event-default&orientation=landscape',
      participants: event.capacity ? `${event.capacity}` : 'Inscription libre',
      statut: event.status,
      organisateur: 'HCBE Canada',
      contact: 'info@hcbecanada.org',
      inscription: event.meetingLink || 'https://hcbecanada.org/events',
    };
  };
  const evenements = events.map(formatEventForDisplay);

  // Generate months dynamically from actual events
  const getUniqueMonths = () => {
    const months = new Set<string>();
    events.forEach(event => {
      const date = new Date(event.date);
      const monthKey = date.toISOString().slice(5, 7); // MM format
      const monthLabel = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      months.add(`${monthKey}:${monthLabel}`);
    });
    
    const sortedMonths = Array.from(months)
      .map(m => {
        const [value, label] = m.split(':');
        return { value, label: label.charAt(0).toUpperCase() + label.slice(1) };
      })
      .sort((a, b) => a.value.localeCompare(b.value));
    
    return [
      { value: 'tous', label: 'Tous les mois' },
      ...sortedMonths
    ];
  };

  const mois = getUniqueMonths();

  const filteredEvents = selectedMonth === 'tous' 
    ? evenements 
    : evenements.filter(e => e.date.split('-')[1] === selectedMonth);

  return (
    <section id="agenda" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Événements à Venir
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Participez aux activités du HCBE et des associations burkinabè à travers le Canada
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {mois.map((m) => (
              <button
                key={m.value}
                onClick={() => setSelectedMonth(m.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedMonth === m.value
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {m.label}
              </button>
            ))}
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

        {!isLoading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl">📅</span>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun événement trouvé</h3>
            <p className="mt-2 text-gray-500">
              {selectedMonth === 'tous' 
                ? "Aucun événement n'est actuellement programmé." 
                : `Aucun événement pour le mois sélectionné.`}
            </p>
          </div>
        )}

        {!isLoading && !error && filteredEvents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group border border-gray-200 cursor-pointer"
              onClick={() => setSelectedEvent(event.id)}
            >
              <div className="relative h-56 overflow-hidden w-full">
                <img
                  src={event.image}
                  alt={event.titre}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      event.type === 'HCBE'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-900 text-white'
                    }`}
                  >
                    {event.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-900">
                    {event.statut}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {event.titre}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <i className="ri-calendar-line mr-2 text-emerald-600"></i>
                    <span>{new Date(event.date).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <i className="ri-time-line mr-2 text-emerald-600"></i>
                    <span>{event.heure}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <i className="ri-map-pin-line mr-2 text-emerald-600"></i>
                    <span>{event.lieu}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <i className="ri-group-line mr-2 text-emerald-600"></i>
                    <span>{event.participants} participants attendus</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {event.description}
                </p>

                <button className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer">
                  <i className="ri-information-line mr-2"></i>
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {selectedEvent && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {evenements
                .filter((e) => e.id === selectedEvent)
                .map((event) => (
                  <div key={event.id}>
                    <div className="relative h-96 w-full">
                      <img
                        src={event.image}
                        alt={event.titre}
                        className="w-full h-full object-cover object-top"
                      />
                      <button
                        onClick={() => setSelectedEvent(null)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <i className="ri-close-line text-xl text-gray-900"></i>
                      </button>
                      <div className="absolute bottom-6 left-6">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold ${
                            event.type === 'HCBE'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-900 text-white'
                          }`}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <i className="ri-calendar-line mr-2"></i>
                        <span>{new Date(event.date).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="mx-3">•</span>
                        <i className="ri-time-line mr-2"></i>
                        <span>{event.heure}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">{event.titre}</h2>
                      
                      <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start">
                            <i className="ri-map-pin-line text-emerald-600 mr-3 mt-1"></i>
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">Lieu</p>
                              <p className="text-gray-600 text-sm">{event.adresse}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <i className="ri-user-line text-emerald-600 mr-3 mt-1"></i>
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">Organisateur</p>
                              <p className="text-gray-600 text-sm">{event.organisateur}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <i className="ri-group-line text-emerald-600 mr-3 mt-1"></i>
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">Participants</p>
                              <p className="text-gray-600 text-sm">{event.participants} attendus</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <i className="ri-mail-line text-emerald-600 mr-3 mt-1"></i>
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">Contact</p>
                              <p className="text-gray-600 text-sm">{event.contact}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{event.descriptionComplete}</p>
                      </div>

                      <div className="flex gap-4">
                        <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer">
                          <i className="ri-ticket-line mr-2"></i>
                          S'inscrire à l'événement
                        </button>
                        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer">
                          <i className="ri-share-line mr-2"></i>
                          Partager
                        </button>
                        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer">
                          <i className="ri-calendar-check-line mr-2"></i>
                          Ajouter au calendrier
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AgendaSection;
