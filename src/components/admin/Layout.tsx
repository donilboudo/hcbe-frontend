import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SubItem {
  nameKey: string;
  href: string;
  icon: string;
  disabled?: boolean;
}

interface NavItem {
  nameKey: string;
  href?: string;
  icon: string;
  disabled?: boolean;
  subItems?: SubItem[];
}

const navLinkClass = (active: boolean, disabled?: boolean) => {
  if (disabled) {
    return 'cursor-not-allowed text-emerald-100/35';
  }
  if (active) {
    return 'bg-white/12 text-white ring-1 ring-white/15';
  }
  return 'text-emerald-50/75 hover:bg-white/8 hover:text-white';
};

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navigation: NavItem[] = [
    { nameKey: 'admin.nav.dashboard', href: '/admin/dashboard', icon: 'ri-dashboard-line' },
    {
      nameKey: 'admin.nav.news',
      icon: 'ri-newspaper-line',
      subItems: [
        { nameKey: 'admin.nav.events', href: '/admin/events', icon: 'ri-calendar-event-line' },
        { nameKey: 'admin.nav.announcements', href: '/admin/news', icon: 'ri-article-line' },
      ],
    },
    { nameKey: 'admin.nav.associations', href: '/admin/associations', icon: 'ri-building-line' },
    { nameKey: 'admin.nav.projects', href: '/admin/projects', icon: 'ri-hammer-line' },
    { nameKey: 'admin.nav.grants', href: '/admin/grants', icon: 'ri-hand-coin-line' },
    { nameKey: 'admin.nav.consultations', href: '/admin/consultations', icon: 'ri-chat-poll-line' },
    {
      nameKey: 'admin.nav.members',
      icon: 'ri-group-line',
      subItems: [
        { nameKey: 'admin.nav.membersList', href: '/admin/members', icon: 'ri-user-line' },
        { nameKey: 'admin.nav.membershipApplications', href: '/admin/membership-applications', icon: 'ri-user-add-line' },
      ],
    },
    { nameKey: 'admin.nav.teamMembers', href: '/admin/team-members', icon: 'ri-team-line' },
    { nameKey: 'admin.nav.documents', href: '/admin/documents', icon: 'ri-file-text-line' },
    { nameKey: 'admin.nav.users', href: '/admin/users', icon: 'ri-shield-user-line' },
  ];

  const getPageTitle = () => {
    for (const item of navigation) {
      if (item.href && isActive(item.href)) {
        return t(item.nameKey);
      }
      if (item.subItems) {
        const subItem = item.subItems.find((sub) => isActive(sub.href));
        if (subItem) {
          return t(subItem.nameKey);
        }
      }
    }
    return t('admin.layout.defaultPage');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-hidden bg-emerald-950 text-white">
        <div className="border-b border-white/10 px-5 py-5">
          <Link to="/admin/dashboard" className="block">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/80">
              HCBE
            </p>
            <h1 className="mt-1 text-lg font-bold">{t('admin.layout.title')}</h1>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {navigation.map((item) => (
              <div key={item.nameKey}>
                {item.subItems ? (
                  <div className="space-y-1">
                    <div className="flex items-center px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/55">
                      <i className={`${item.icon} mr-2 text-sm`} aria-hidden="true"></i>
                      {t(item.nameKey)}
                    </div>
                    <div className="space-y-1 pl-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.nameKey}
                          to={subItem.disabled ? '#' : subItem.href}
                          className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition ${navLinkClass(
                            isActive(subItem.href),
                            subItem.disabled,
                          )}`}
                          onClick={(e) => subItem.disabled && e.preventDefault()}
                        >
                          <i className={`${subItem.icon} mr-3 text-base`} aria-hidden="true"></i>
                          <span className="truncate">{t(subItem.nameKey)}</span>
                          {subItem.disabled && (
                            <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-100/60">
                              {t('admin.common.soon')}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.disabled ? '#' : item.href!}
                    className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition ${navLinkClass(
                      isActive(item.href!),
                      item.disabled,
                    )}`}
                    onClick={(e) => item.disabled && e.preventDefault()}
                  >
                    <i className={`${item.icon} mr-3 text-base`} aria-hidden="true"></i>
                    <span className="truncate">{t(item.nameKey)}</span>
                    {item.disabled && (
                      <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-100/60">
                        {t('admin.common.soon')}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
            <div className="truncate text-sm font-semibold text-white">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="truncate text-xs text-emerald-100/65">{user?.email}</div>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 inline-flex items-center text-xs font-semibold text-emerald-100/80 transition hover:text-white"
            >
              {t('admin.layout.signOut')}
              <i className="ri-logout-box-r-line ml-1" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </aside>

      <div className="pl-64">
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Administration
              </p>
              <h2 className="mt-1 text-2xl font-bold text-gray-950">{getPageTitle()}</h2>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <span className="hidden text-sm text-gray-600 md:inline">
                {t('admin.layout.welcome', { name: user?.firstName })}
              </span>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
