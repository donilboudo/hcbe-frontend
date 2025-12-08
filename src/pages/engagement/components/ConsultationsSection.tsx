const ConsultationsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full mb-4">
            <i className="ri-chat-poll-line text-emerald-600"></i>
            <span className="text-emerald-600 font-semibold text-sm">Votre Opinion Compte</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Consultations et Sondages
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Partagez vos avis, suggestions et recommandations pour améliorer nos services et orienter nos actions
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center">
                <i className="ri-questionnaire-line text-4xl text-white"></i>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Sondage Annuel 2024
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Participez à notre sondage annuel pour nous aider à mieux comprendre vos besoins et améliorer nos services. Vos réponses sont confidentielles et nous permettront de mieux vous servir.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg whitespace-nowrap cursor-pointer">
                  <i className="ri-survey-line mr-2"></i>
                  Répondre au Sondage
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-gray-300 whitespace-nowrap cursor-pointer">
                  <i className="ri-bar-chart-line mr-2"></i>
                  Voir les Résultats
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <i className="ri-feedback-line text-3xl text-emerald-600"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Boîte à Suggestions</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Vous avez une idée pour améliorer nos services ou nos activités ? Partagez-la avec nous de manière anonyme ou identifiée.
            </p>
            <button className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-lightbulb-line mr-2"></i>
              Soumettre une Suggestion
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <i className="ri-discuss-line text-3xl text-amber-600"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Consultations Publiques</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Participez aux consultations publiques sur les projets et décisions importantes qui concernent notre communauté.
            </p>
            <button className="w-full px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-chat-voice-line mr-2"></i>
              Voir les Consultations
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-megaphone-line text-3xl text-white"></i>
            </div>
            <h3 className="text-3xl font-bold mb-4">Votre Voix est Importante</h3>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Le HCBE Canada est à l'écoute de sa communauté. Vos avis, suggestions et recommandations nous aident à mieux vous servir et à orienter nos actions pour répondre à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-mail-line mr-2"></i>
                Nous Contacter
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20 whitespace-nowrap cursor-pointer">
                <i className="ri-calendar-line mr-2"></i>
                Prendre Rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationsSection;
