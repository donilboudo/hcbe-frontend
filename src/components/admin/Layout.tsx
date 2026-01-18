import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface SubItem {
  name: string;
  href: string;
  icon: string;
  disabled?: boolean;
}

interface NavItem {
  name: string;
  href?: string;
  icon: string;
  disabled?: boolean;
  subItems?: SubItem[];
}

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { 
      name: 'Actualités', 
      icon: '📰',
      subItems: [
        { name: 'Events', href: '/admin/events', icon: '🎟️' },
        { name: 'News', href: '/admin/news', icon: '📄', disabled: true },
      ]
    },
    { name: 'Associations', href: '/admin/associations', icon: '🏢' },
    { name: 'Projects', href: '/admin/projects', icon: '🚧' },
    { name: 'Team Members', href: '/admin/team-members', icon: '👥' },
    { name: 'Documents', href: '/admin/documents', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 overflow-y-auto">
        <div className="flex items-center justify-center h-16 px-4 bg-gray-800">
          <h1 className="text-xl font-bold text-white">HCBE Admin</h1>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  // Menu avec sous-items
                  <div className="space-y-1">
                    <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-300">
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.name}
                    </div>
                    <div className="ml-6 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.disabled ? '#' : subItem.href}
                          className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                            subItem.disabled
                              ? 'text-gray-500 cursor-not-allowed'
                              : isActive(subItem.href)
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                          }`}
                          onClick={(e) => subItem.disabled && e.preventDefault()}
                        >
                          <span className="mr-3">{subItem.icon}</span>
                          {subItem.name}
                          {subItem.disabled && (
                            <span className="ml-auto text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded">
                              Soon
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Menu simple
                  <Link
                    to={item.disabled ? '#' : item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.disabled
                        ? 'text-gray-500 cursor-not-allowed'
                        : isActive(item.href)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={(e) => item.disabled && e.preventDefault()}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                    {item.disabled && (
                      <span className="ml-auto text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded">
                        Soon
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <div className="bg-gray-800 rounded-lg p-3 text-sm">
            <div className="text-white font-medium">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-gray-400 text-xs">{user?.email}</div>
            <button
              onClick={handleLogout}
              className="mt-2 w-full text-left text-gray-300 hover:text-white text-xs"
            >
              Sign out →
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {(() => {
                  const current = navigation.find(item => {
                    if (item.href && isActive(item.href)) return true;
                    if (item.subItems) {
                      return item.subItems.some(sub => isActive(sub.href));
                    }
                    return false;
                  });
                  if (current?.subItems) {
                    const subItem = current.subItems.find(sub => isActive(sub.href));
                    return subItem?.name || current.name;
                  }
                  return current?.name || 'Admin';
                })()}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome back, {user?.firstName}!
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};