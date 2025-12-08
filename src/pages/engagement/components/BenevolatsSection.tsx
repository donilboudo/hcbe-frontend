import { useState } from 'react';

const BenevolatsSection = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    ville: '',
    competences: '',
    disponibilite: '',
    motivation: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataEncoded = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      formDataEncoded.append(key, value);
    });

    try {
      const response = await fetch('https://readdy.ai/api/public/form/submit/hcbe-benevolat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataEncoded.toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          ville: '',
          competences: '',
          disponibilite: '',
          motivation: '',
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Devenez Bénévole</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contribuez au développement de notre communauté en partageant votre temps et vos compétences
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <form id="benevolat-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Ville de résidence *
              </label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Compétences et domaines d'expertise *
              </label>
              <input
                type="text"
                name="competences"
                value={formData.competences}
                onChange={handleChange}
                placeholder="Ex: Juridique, RH, Finance, Communication..."
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Disponibilité *
              </label>
              <select
                name="disponibilite"
                value={formData.disponibilite}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
              >
                <option value="">Sélectionnez votre disponibilité</option>
                <option value="quelques-heures-semaine">Quelques heures par semaine</option>
                <option value="quelques-heures-mois">Quelques heures par mois</option>
                <option value="evenements-ponctuels">Événements ponctuels</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Motivation (max 500 caractères) *
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                maxLength={500}
                rows={4}
                placeholder="Pourquoi souhaitez-vous devenir bénévole au HCBE ?"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm resize-none"
              ></textarea>
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.motivation.length}/500 caractères
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Soumettre ma candidature
            </button>
          </form>

          {isSubmitted && (
            <div className="mt-6 p-4 bg-emerald-600/20 border border-emerald-600 rounded-lg text-emerald-700">
              <i className="ri-check-line mr-2"></i>
              Merci pour votre candidature ! Nous vous contacterons bientôt.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BenevolatsSection;
