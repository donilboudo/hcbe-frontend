import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { HcbeLogoMark } from '../brand/HcbeLogo';
import { features } from '../../config/features';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  useEffect(() => {
    if (!isSidebarOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isSidebarOpen]);

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
        {
          nameKey: 'admin.nav.membershipApplications',
          href: '/admin/membership-applications',
          icon: 'ri-user-add-line',
        },
      ],
    },
    ...(features.adminTeamMembersEnabled
      ? [{ nameKey: 'admin.nav.teamMembers', href: '/admin/team-members', icon: 'ri-team-line' }]
      : []),
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

  const sidebarContent = (
    <>
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <Link to="/admin/dashboard" className="flex min-w-0 items-center gap-3" onClick={closeSidebar}>
            <HcbeLogoMark size="sm" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/80">
                HCBE Canada
              </p>
              <h1 className="mt-0.5 truncate text-lg font-bold">{t('admin.layout.title')}</h1>
            </div>
          </Link>
          <button
            type="button"
            onClick={closeSidebar}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
            aria-label={t('admin.layout.closeMenu')}
          >
            <i className="ri-close-line text-xl" aria-hidden="true"></i>
          </button>
        </div>
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
                        onClick={(e) => {
                          if (subItem.disabled) {
                            e.preventDefault();
                            return;
                          }
                          closeSidebar();
                        }}
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
                  onClick={(e) => {
                    if (item.disabled) {
                      e.preventDefault();
                      return;
                    }
                    closeSidebar();
                  }}
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
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      {isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-gray-950/50 backdrop-blur-[1px] lg:hidden"
          aria-label={t('admin.layout.closeMenu')}
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] flex-col overflow-hidden bg-emerald-950 text-white shadow-2xl transition-transform duration-300 ease-out lg:w-64 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isSidebarOpen}
      >
        {sidebarContent}
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 lg:hidden"
              aria-label={t('admin.layout.openMenu')}
              aria-expanded={isSidebarOpen}
            >
              <i className="ri-menu-line text-xl" aria-hidden="true"></i>
            </button>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">
                {t('admin.dashboard.badge')}
              </p>
              <h2 className="mt-0.5 truncate text-lg font-bold text-gray-950 sm:text-2xl">
                {getPageTitle()}
              </h2>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              <LanguageSwitcher />
              <span className="hidden text-sm text-gray-600 xl:inline">
                {t('admin.layout.welcome', { name: user?.firstName })}
              </span>
            </div>
          </div>
        </header>

        <main className="overflow-x-hidden p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
