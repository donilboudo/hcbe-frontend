import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home/page'));
const ServicesPage = lazy(() => import('../pages/services/page'));
const ActualitesPage = lazy(() => import('../pages/actualites/page'));
const EngagementPage = lazy(() => import('../pages/engagement/page'));
const EspaceMembrePage = lazy(() => import('../pages/espace-membre/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/actualites',
    element: <ActualitesPage />,
  },
  {
    path: '/engagement',
    element: <EngagementPage />,
  },
  {
    path: '/espace-membre',
    element: <EspaceMembrePage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
