import { useState } from 'react';

const GalerieSection = () => {
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video'; src: string; title: string } | null>(null);

  const galerie = [
    {
      id: 1,
      type: 'image' as const,
      titre: 'Forum Entrepreneuriat 2023',
      date: '2023-11-15',
      src: 'https://readdy.ai/api/search-image?query=Professional%20business%20forum%20with%20African%20entrepreneurs%20networking%20and%20presenting%2C%20modern%20conference%20venue%20with%20engaged%20audience%2C%20bright%20professional%20lighting%20creating%20dynamic%20atmosphere%2C%20representing%20successful%20community%20business%20event&width=800&height=600&seq=galerie-forum-001&orientation=landscape',
      thumbnail: 'https://readdy.ai/api/search-image?query=Professional%20business%20forum%20with%20African%20entrepreneurs%20networking%20and%20presenting%2C%20modern%20conference%20venue%20with%20engaged%20audience%2C%20bright%20professional%20lighting%20creating%20dynamic%20atmosphere%2C%20representing%20successful%20community%20business%20event&width=400&height=300&seq=galerie-forum-thumb-001&orientation=landscape',
    },
    {
      id: 2,
      type: 'image' as const,
      titre: 'Célébration Fête Nationale 2023',
      date: '2023-12-11',
      src: 'https://readdy.ai/api/search-image?query=Vibrant%20national%20celebration%20with%20Burkina%20Faso%20flags%20and%20traditional%20costumes%2C%20festive%20outdoor%20gathering%20with%20dancing%20and%20cultural%20performances%2C%20warm%20colorful%20lighting%20creating%20joyful%20atmosphere%2C%20representing%20national%20pride%20celebration&width=800&height=600&seq=galerie-fete-001&orientation=landscape',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vibrant%20national%20celebration%20with%20Burkina%20Faso%20flags%20and%20traditional%20costumes%2C%20festive%20outdoor%20gathering%20with%20dancing%20and%20cultural%20performances%2C%20warm%20colorful%20lighting%20creating%20joyful%20atmosphere%2C%20representing%20national%20pride%20celebration&width=400&height=300&seq=galerie-fete-thumb-001&orientation=landscape',
    },
    {
      id: 3,
      type: 'image' as const,
      titre: 'Atelier Intégration Nouveaux Arrivants',
      date: '2023-10-20',
      src: 'https://readdy.ai/api/search-image?query=Welcoming%20integration%20workshop%20with%20diverse%20newcomers%20learning%20together%2C%20community%20center%20with%20informative%20presentations%20and%20friendly%20atmosphere%2C%20bright%20natural%20lighting%20creating%20supportive%20environment%2C%20representing%20newcomer%20orientation%20and%20community%20support&width=800&height=600&seq=galerie-integration-001&orientation=landscape',
      thumbnail: 'https://readdy.ai/api/search-image?query=Welcoming%20integration%20workshop%20with%20diverse%20newcomers%20learning%20together%2C%20community%20center%20with%20informative%20presentations%20and%20friendly%20atmosphere%2C%20bright%20natural%20lighting%20creating%20supportive%20environment%2C%20representing%20newcomer%20orientation%20and%20community%20support&width=400&height=300&seq=galerie-integration-thumb-001&orientation=landscape',
    },
    {
      id: 4,
      type: 'image' as const,
      titre: 'Soirée Culturelle Traditionnelle',
      date: '2023-09-30',
      src: 'https://readdy.ai/api/search-image?query=Traditional%20African%20cultural%20evening%20with%20dancers%20in%20colorful%20traditional%20attire%2C%20vibrant%20stage%20with%20drums%20and%20cultural%20decorations%2C%20warm%20atmospheric%20lighting%20creating%20festive%20mood%2C%20representing%20cultural%20heritage%20celebration&width=800&height=600&seq=galerie-culturel-001&orientation=landscape',
      thumbnail: 'https://readdy.ai/api/search-image?query=Traditional%20African%20cultural%20evening%20with%20dancers%20in%20colorful%20traditional%20attire%2C%20vibrant%20stage%20with%20drums%20and%20cultural%20decorations%2C%20warm%20atmospheric%20lighting%20creating%20festive%20mood%2C%20representing%20cultural%20heritage%20celebration&width=400&height=300&seq=galerie-culturel-thumb-001&orientation=landscape',
    },
    {
      id: 5,
      type: 'image' as const,
      titre: 'Tournoi Football Communautaire',
      date: '2023-08-15',
      src: 'https://readdy.ai/api/search-image?query=Community%20soccer%20tournament%20with%20diverse%20African%20players%20celebrating%20on%20field%2C%20outdoor%20sports%20venue%20with%20spectators%20cheering%2C%20sunny%20bright%20lighting%20creating%20energetic%20atmosphere%2C%20representing%20sports%20and%20community%20unity&width=800&height=600&seq=galerie-sport-001&orientation=landscape',
      thumbnail: 'https://readdy.ai/api/search-image?query=Community%20soccer%20tournament%20with%20diverse%20African%20players%20celebrating%20on%20field%2C%20outdoor%20sports%20venue%20with%20spectators%20cheering%2C%20sunny%20bright%20lighting%20creating%20energetic%20atmosphere%2C%20representing%20sports%20and%20community%20unity&width=400&height=300&seq=galerie-sport-thumb-001&orientation=landscape',
    },
    {
      id: 6,
      type: 'image' as const,
      titre: 'Remise de Bourses d\'Études',
      date: '2023-07-10',
      src: 'https://readdy.ai/api/search-image?query=Scholarship%20award%20ceremony%20with%20students%20receiving%20certificates%2C%20formal%20academic%20setting%20with%20proud%20families%20watching%2C%20professional%20lighting%20creating%20celebratory%20atmosphere%2C%20representing%20educational%20achievement%20and%20community%20support&width=800&height=600&seq=galerie-bourses-001&orientation=landscape',
      thumbnail: 'https://readdy.ai/api/search-image?query=Scholarship%20award%20ceremony%20with%20students%20receiving%20certificates%2C%20formal%20academic%20setting%20with%20proud%20families%20watching%2C%20professional%20lighting%20creating%20celebratory%20atmosphere%2C%20representing%20educational%20achievement%20and%20community%20support&width=400&height=300&seq=galerie-bourses-thumb-001&orientation=landscape',
    },
    {
      id: 7,
      type: 'image' as const,
      titre: 'Conférence Éducation Financière',
      date: '2023-06-25',
      src: 'https://readdy.ai/api/search-image?query=Financial%20education%20seminar%20with%20expert%20presenter%20and%20engaged%20audience%20taking%20notes%2C%20modern%20conference%20room%20with%20financial%20charts%2C%20professional%20lighting%20creating%20educational%20atmosphere%2C%20representing%20financial%20literacy%20workshop&width=800&height=600&seq=galerie-finance-001&orientation=landscape',
      thumbnail: 'https://readdy.ai/api/search-image?query=Financial%20education%20seminar%20with%20expert%20presenter%20and%20engaged%20audience%20taking%20notes%2C%20modern%20conference%20room%20with%20financial%20charts%2C%20professional%20lighting%20creating%20educational%20atmosphere%2C%20representing%20financial%20literacy%20workshop&width=400&height=300&seq=galerie-finance-thumb-001&orientation=landscape',
    },
    {
      id: 8,
      type: 'image' as const,
      titre: 'Journée Internationale de la Femme',
      date: '2023-03-08',
      src: 'https://readdy.ai/api/search-image?query=International%20Women%20Day%20celebration%20with%20empowered%20African%20women%20leaders%20speaking%2C%20inspiring%20venue%20with%20flowers%20and%20unity%20symbols%2C%20warm%20bright%20lighting%20creating%20celebratory%20atmosphere%2C%20representing%20women%20empowerment%20and%20achievement&width=800&height=600&seq=galerie-femmes-001&orientation=landscape',
      thumbnail: 'https://readdy.ai/api/search-image?query=International%20Women%20Day%20celebration%20with%20empowered%20African%20women%20leaders%20speaking%2C%20inspiring%20venue%20with%20flowers%20and%20unity%20symbols%2C%20warm%20bright%20lighting%20creating%20celebratory%20atmosphere%2C%20representing%20women%20empowerment%20and%20achievement&width=400&height=300&seq=galerie-femmes-thumb-001&orientation=landscape',
    },
    {
      id: 9,
      type: 'image' as const,
      titre: 'Assemblée Générale Annuelle 2023',
      date: '2023-05-20',
      src: 'https://readdy.ai/api/search-image?query=Annual%20general%20assembly%20meeting%20with%20community%20members%20voting%20and%20discussing%2C%20formal%20meeting%20room%20with%20presentation%20screens%2C%20professional%20lighting%20creating%20official%20atmosphere%2C%20representing%20democratic%20community%20governance&width=800&height=600&seq=galerie-assemblee-001&orientation=landscape',
      thumbnail: 'https://readdy.ai/api/search-image?query=Annual%20general%20assembly%20meeting%20with%20community%20members%20voting%20and%20discussing%2C%20formal%20meeting%20room%20with%20presentation%20screens%2C%20professional%20lighting%20creating%20official%20atmosphere%2C%20representing%20democratic%20community%20governance&width=400&height=300&seq=galerie-assemblee-thumb-001&orientation=landscape',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Souvenirs de nos Événements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revivez les moments forts de la communauté burkinabè au Canada à travers nos photos et vidéos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galerie.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer border border-gray-200"
              onClick={() => setSelectedMedia({ type: item.type, src: item.src, title: item.titre })}
            >
              <div className="relative h-64 overflow-hidden w-full">
                <img
                  src={item.thumbnail}
                  alt={item.titre}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <i className={`ri-${item.type === 'video' ? 'play' : 'image'}-line text-3xl text-emerald-600`}></i>
                  </div>
                </div>
                {item.type === 'video' && (
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <i className="ri-play-fill text-white text-lg"></i>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <i className="ri-calendar-line mr-2"></i>
                  <span>{new Date(item.date).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.titre}</h3>
              </div>
            </div>
          ))}
        </div>

        {selectedMedia && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div className="relative max-w-6xl w-full">
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute -top-12 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl text-gray-900"></i>
              </button>
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  className="w-full h-auto rounded-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div className="aspect-video bg-black rounded-2xl" onClick={(e) => e.stopPropagation()}>
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <i className="ri-video-line text-6xl mb-4"></i>
                      <p className="text-lg">Vidéo : {selectedMedia.title}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white">{selectedMedia.title}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all shadow-lg whitespace-nowrap cursor-pointer">
            <i className="ri-folder-image-line mr-2"></i>
            Voir toute la galerie
          </button>
        </div>
      </div>
    </section>
  );
};

export default GalerieSection;
