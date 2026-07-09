import { useState } from 'react';

const GalerieSection = () => {
  const [selectedMedia, setSelectedMedia] = useState<{ title: string; date: string; theme: string } | null>(null);

  const galerie = [
    {
      id: 1,
      titre: 'Forum Entrepreneuriat 2023',
      date: '2023-11-15',
      theme: 'Réseautage',
      gradient: 'from-emerald-700 to-slate-900',
    },
    {
      id: 2,
      titre: 'Célébration Fête Nationale 2023',
      date: '2023-12-11',
      theme: 'Culture',
      gradient: 'from-amber-500 to-red-700',
    },
    {
      id: 3,
      titre: 'Atelier Intégration Nouveaux Arrivants',
      date: '2023-10-20',
      theme: 'Accueil',
      gradient: 'from-blue-600 to-emerald-800',
    },
    {
      id: 4,
      titre: 'Soirée Culturelle Traditionnelle',
      date: '2023-09-30',
      theme: 'Patrimoine',
      gradient: 'from-orange-600 to-amber-700',
    },
    {
      id: 5,
      titre: 'Tournoi Football Communautaire',
      date: '2023-08-15',
      theme: 'Sport',
      gradient: 'from-emerald-600 to-lime-700',
    },
    {
      id: 6,
      titre: 'Remise de Bourses d\'Études',
      date: '2023-07-10',
      theme: 'Éducation',
      gradient: 'from-indigo-600 to-emerald-800',
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
              <i className="ri-camera-line" aria-hidden="true"></i>
              Archives communautaires
            </div>
            {/* <h2 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              Souvenirs de nos événements
            </h2> */}
          </div>
          <p className="text-lg leading-8 text-gray-600">
            Revivez les moments forts de la communauté burkinabè au Canada à travers nos photos et vidéos
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galerie.map((item) => (
            <button
              key={item.id}
              type="button"
              className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl"
              onClick={() => setSelectedMedia({ title: item.titre, date: item.date, theme: item.theme })}
            >
              <div className={`relative h-64 bg-gradient-to-br ${item.gradient} p-6 text-white`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_28%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <span className="w-fit rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                    {item.theme}
                  </span>
                  <div>
                    <i className="ri-image-line text-4xl text-white/80" aria-hidden="true"></i>
                    <h3 className="mt-4 text-2xl font-bold">{item.titre}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500">
                  <i className="ri-calendar-line mr-2" aria-hidden="true"></i>
                  <span>{new Date(item.date).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </button>
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
              <div className="rounded-[2rem] bg-white p-8 text-gray-950" onClick={(e) => e.stopPropagation()}>
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50 text-4xl text-amber-700">
                  <i className="ri-image-line" aria-hidden="true"></i>
                </div>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{selectedMedia.theme}</p>
                <h3 className="mt-3 text-3xl font-bold">{selectedMedia.title}</h3>
                <p className="mt-3 text-gray-600">
                  {new Date(selectedMedia.date).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="mt-6 leading-7 text-gray-600">
                  Les vraies photos pourront être branchées ici lorsqu'elles seront disponibles dans
                  la médiathèque du HCBE Canada.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalerieSection;
