import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HCBE</span>
              </div>
              <div>
                <div className="font-bold text-lg text-gray-900">HCBE Canada</div>
                <div className="text-sm text-gray-600">Ensemble pour le Burkina</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Représenter et mobiliser la diaspora burkinabè au Canada pour le développement du Burkina Faso.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Services et Ressources
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Actualités et Événements
                </Link>
              </li>
              <li>
                <Link to="/engagement" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  Engagement Communautaire
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">Contacts</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <i className="ri-mail-line text-lg mt-0.5 text-gray-500"></i>
                <span className="text-sm text-gray-600">contact@hcbecanada.org</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="ri-phone-line text-lg mt-0.5 text-gray-500"></i>
                <span className="text-sm text-gray-600">+1 (XXX) XXX-XXXX</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="ri-map-pin-line text-lg mt-0.5 text-gray-500"></i>
                <span className="text-sm text-gray-600">Canada</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">Suivez-nous</h3>
            <div className="flex space-x-3 mb-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-emerald-600 hover:text-white rounded-lg flex items-center justify-center transition-all"
              >
                <i className="ri-facebook-fill text-xl text-gray-700 hover:text-white"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-emerald-600 hover:text-white rounded-lg flex items-center justify-center transition-all"
              >
                <i className="ri-twitter-x-fill text-xl text-gray-700 hover:text-white"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-emerald-600 hover:text-white rounded-lg flex items-center justify-center transition-all"
              >
                <i className="ri-linkedin-fill text-xl text-gray-700 hover:text-white"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-emerald-600 hover:text-white rounded-lg flex items-center justify-center transition-all"
              >
                <i className="ri-youtube-fill text-xl text-gray-700 hover:text-white"></i>
              </a>
            </div>
            <p className="text-sm text-gray-600">
              Restez informé de nos actualités et événements
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {currentYear} HCBE Canada. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap">
                Powered by Readdy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
