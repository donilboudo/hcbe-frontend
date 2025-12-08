import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Rejoignez la Communauté HCBE Canada
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Ensemble, nous sommes plus forts. Devenez membre et contribuez au développement de notre communauté et du Burkina Faso.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/espace-membre"
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            Devenir Membre
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            Nous Contacter
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
