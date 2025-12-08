import { useState } from 'react';

const AgendaSection = () => {
  const [selectedMonth, setSelectedMonth] = useState('tous');
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const evenements = [
    {
      id: 1,
      titre: 'Forum sur l\'Entrepreneuriat de la Diaspora',
      date: '2024-02-15',
      heure: '18h00 - 21h00',
      lieu: 'Toronto, ON',
      adresse: 'Centre Communautaire de Toronto, 123 Rue Principale',
      type: 'HCBE',
      description: 'Rencontre avec des entrepreneurs burkinabè à succès et présentation d\'opportunités d\'investissement au Burkina Faso.',
      descriptionComplete: 'Le HCBE Canada organise un forum majeur sur l\'entrepreneuriat de la diaspora burkinabè. Cet événement réunira des entrepreneurs à succès, des experts en développement économique et des représentants du gouvernement burkinabè. Au programme : témoignages inspirants, présentation d\'opportunités d\'investissement, ateliers pratiques sur la création d\'entreprise, et sessions de réseautage. Une occasion unique de rencontrer des acteurs clés du développement économique et de découvrir comment contribuer à la croissance du Burkina Faso tout en développant vos projets entrepreneuriaux.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20forum%20with%20African%20entrepreneurs%20networking%20and%20discussing%20opportunities%2C%20modern%20conference%20room%20with%20presentation%20screens%20and%20business%20materials%2C%20bright%20natural%20lighting%20creating%20dynamic%20atmosphere%2C%20representing%20entrepreneurship%20and%20business%20development&width=600&height=400&seq=event-forum-001&orientation=landscape',
      participants: '150+',
      statut: 'À venir',
      organisateur: 'HCBE Canada',
      contact: 'forum@hcbecanada.org',
      inscription: 'https://hcbecanada.org/forum-entrepreneuriat',
    },
    {
      id: 2,
      titre: 'Célébration de la Fête Nationale du Burkina Faso',
      date: '2024-12-11',
      heure: '14h00 - 22h00',
      lieu: 'Ottawa, ON',
      adresse: 'Centre des Congrès d\'Ottawa, 55 Colonel By Drive',
      type: 'HCBE',
      description: 'Grande célébration de la fête nationale avec spectacles culturels, gastronomie burkinabè et activités pour toute la famille.',
      descriptionComplete: 'Rejoignez-nous pour célébrer la Fête Nationale du Burkina Faso dans une ambiance festive et conviviale ! Au programme : spectacles de musique et danse traditionnelles, défilé de mode avec tenues traditionnelles burkinabè, exposition d\'artisanat, dégustation de plats traditionnels, activités pour enfants, et discours officiels. Cette journée sera l\'occasion de célébrer notre patrimoine culturel, de renforcer les liens communautaires et de transmettre nos valeurs aux jeunes générations. Venez nombreux avec vos familles pour partager ce moment de fierté nationale !',
      image: 'https://readdy.ai/api/search-image?query=Vibrant%20cultural%20celebration%20with%20African%20community%20gathering%20in%20festive%20atmosphere%2C%20colorful%20traditional%20decorations%20and%20cultural%20elements%2C%20warm%20natural%20lighting%20creating%20joyful%20ambiance%2C%20representing%20national%20pride%20and%20cultural%20heritage%20celebration&width=600&height=400&seq=event-fete-001&orientation=landscape',
      participants: '300+',
      statut: 'À venir',
      organisateur: 'HCBE Canada',
      contact: 'fete@hcbecanada.org',
      inscription: 'https://hcbecanada.org/fete-nationale',
    },
    {
      id: 3,
      titre: 'Atelier d\'Intégration pour Nouveaux Arrivants',
      date: '2024-02-20',
      heure: '10h00 - 16h00',
      lieu: 'Montréal, QC',
      adresse: 'Centre Communautaire de Montréal, 456 Boulevard Saint-Laurent',
      type: 'HCBE',
      description: 'Session d\'orientation complète pour les nouveaux arrivants burkinabè : démarches administratives, système de santé, éducation, emploi.',
      descriptionComplete: 'Le HCBE Canada organise une journée complète d\'orientation pour faciliter l\'intégration des nouveaux arrivants burkinabè au Canada. Cette session couvrira tous les aspects essentiels de la vie au Canada : démarches administratives (carte de résident permanent, permis de conduire, assurance maladie), système de santé canadien, système d\'éducation et inscription scolaire, recherche d\'emploi et reconnaissance des diplômes, logement et services bancaires, et ressources communautaires disponibles. Des experts et des membres expérimentés de la communauté partageront leurs conseils pratiques et répondront à toutes vos questions.',
      image: 'https://readdy.ai/api/search-image?query=Welcoming%20integration%20workshop%20with%20diverse%20newcomers%20learning%20and%20interacting%20positively%2C%20modern%20community%20center%20with%20informative%20materials%20and%20friendly%20atmosphere%2C%20bright%20natural%20lighting%20creating%20supportive%20environment%2C%20representing%20newcomer%20support%20and%20community%20integration&width=600&height=400&seq=event-integration-001&orientation=landscape',
      participants: '80+',
      statut: 'À venir',
      organisateur: 'HCBE Canada - Comité d\'Intégration',
      contact: 'integration@hcbecanada.org',
      inscription: 'https://hcbecanada.org/atelier-integration',
    },
    {
      id: 4,
      titre: 'Soirée Culturelle - Association Yam Taaba',
      date: '2024-02-25',
      heure: '19h00 - 23h00',
      lieu: 'Calgary, AB',
      adresse: 'Salle Communautaire de Calgary, 789 Avenue Centre',
      type: 'Association',
      description: 'Soirée culturelle organisée par l\'Association Yam Taaba avec musique traditionnelle, danse et exposition d\'artisanat burkinabè.',
      descriptionComplete: 'L\'Association Yam Taaba vous invite à une soirée culturelle exceptionnelle célébrant la richesse de notre patrimoine burkinabè. La soirée débutera par une exposition d\'artisanat traditionnel (tissage, poterie, sculpture), suivie de performances de musique traditionnelle avec des instruments authentiques (balafon, djembé, kora). Des groupes de danse présenteront des chorégraphies traditionnelles des différentes régions du Burkina Faso. Un buffet de spécialités burkinabè sera servi. Cette soirée est une occasion unique de découvrir ou redécouvrir notre culture dans une ambiance chaleureuse et conviviale.',
      image: 'https://readdy.ai/api/search-image?query=Cultural%20evening%20event%20with%20traditional%20African%20music%20and%20dance%20performance%20on%20stage%2C%20vibrant%20colorful%20cultural%20decorations%20and%20traditional%20elements%2C%20warm%20atmospheric%20lighting%20creating%20festive%20mood%2C%20representing%20cultural%20preservation%20and%20community%20celebration&width=600&height=400&seq=event-culturel-001&orientation=landscape',
      participants: '120+',
      statut: 'À venir',
      organisateur: 'Association Yam Taaba',
      contact: 'contact@yamtaaba.ca',
      inscription: 'https://yamtaaba.ca/soiree-culturelle',
    },
    {
      id: 5,
      titre: 'Conférence sur l\'Éducation Financière',
      date: '2024-03-05',
      heure: '18h30 - 20h30',
      lieu: 'Vancouver, BC',
      adresse: 'Centre d\'Affaires de Vancouver, 321 Rue Granville',
      type: 'HCBE',
      description: 'Conférence animée par des experts financiers sur la gestion budgétaire, l\'épargne et l\'investissement au Canada.',
      descriptionComplete: 'Le HCBE Canada organise une conférence sur l\'éducation financière animée par des conseillers financiers certifiés. Cette session interactive couvrira les thèmes suivants : principes de base de la gestion budgétaire, stratégies d\'épargne efficaces, introduction aux investissements (REER, CELI, actions, obligations), planification de la retraite, gestion du crédit et de la dette, et protection financière (assurances). Les participants recevront des outils pratiques et des ressources pour améliorer leur santé financière. Une période de questions-réponses permettra d\'obtenir des conseils personnalisés.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20financial%20education%20seminar%20with%20expert%20presenter%20and%20engaged%20audience%20listening%2C%20modern%20conference%20room%20with%20financial%20charts%20and%20educational%20materials%2C%20bright%20professional%20lighting%20creating%20educational%20atmosphere%2C%20representing%20financial%20literacy%20and%20planning&width=600&height=400&seq=event-finance-001&orientation=landscape',
      participants: '60+',
      statut: 'À venir',
      organisateur: 'HCBE Canada - Comité Économique',
      contact: 'economie@hcbecanada.org',
      inscription: 'https://hcbecanada.org/conference-finance',
    },
    {
      id: 6,
      titre: 'Tournoi de Football Communautaire',
      date: '2024-03-12',
      heure: '09h00 - 17h00',
      lieu: 'Toronto, ON',
      adresse: 'Complexe Sportif de Toronto, 987 Avenue des Sports',
      type: 'Association',
      description: 'Tournoi de football amical réunissant les associations burkinabè du Canada pour promouvoir le sport et la cohésion.',
      descriptionComplete: 'Les associations burkinabè du Canada s\'affrontent dans un tournoi de football amical et convivial ! Cet événement sportif réunira des équipes de différentes villes canadiennes pour une journée de compétition amicale, de fair-play et de fraternité. Au-delà du sport, ce tournoi vise à renforcer les liens entre les communautés burkinabè à travers le Canada, promouvoir un mode de vie sain et actif, et offrir un espace de rencontre pour les jeunes. Des activités parallèles seront organisées pour les familles et les supporters. Remise de trophées et réception conviviale en fin de journée.',
      image: 'https://readdy.ai/api/search-image?query=Community%20soccer%20tournament%20with%20diverse%20African%20players%20on%20outdoor%20field%20playing%20together%2C%20sunny%20day%20with%20spectators%20cheering%20enthusiastically%2C%20bright%20natural%20lighting%20creating%20energetic%20atmosphere%2C%20representing%20sports%20and%20community%20unity&width=600&height=400&seq=event-sport-001&orientation=landscape',
      participants: '200+',
      statut: 'À venir',
      organisateur: 'Associations Burkinabè du Canada',
      contact: 'tournoi@burkinabecanada.org',
      inscription: 'https://burkinabecanada.org/tournoi-football',
    },
  ];

  const mois = [
    { value: 'tous', label: 'Tous les mois' },
    { value: '02', label: 'Février 2024' },
    { value: '03', label: 'Mars 2024' },
    { value: '12', label: 'Décembre 2024' },
  ];

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
