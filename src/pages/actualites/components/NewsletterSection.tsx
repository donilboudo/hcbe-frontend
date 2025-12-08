import { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new URLSearchParams();
    formData.append('email', email);

    try {
      const response = await fetch('https://readdy.ai/api/public/form/submit/hcbe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-mail-line text-3xl text-white"></i>
        </div>
        <h2 className="text-4xl font-bold text-white mb-6">
          Restez Informé
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Inscrivez-vous à notre newsletter pour recevoir les dernières actualités, événements et opportunités de la communauté HCBE
        </p>

        <form
          id="newsletter-form"
          data-readdy-form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
              className="flex-1 px-6 py-4 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              S'inscrire
            </button>
          </div>
        </form>

        {isSubmitted && (
          <div className="mt-6 p-4 bg-emerald-600/20 border border-emerald-600 rounded-lg text-emerald-400">
            <i className="ri-check-line mr-2"></i>
            Merci pour votre inscription !
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
