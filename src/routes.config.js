/**
 * Single source of truth for app routes.
 * Consumed by router.js (matching, titles) and app (nav maps, nav items).
 *
 * Fields:
 *   path       - URL pattern (use :param for dynamic segments). Logical, no app prefix.
 *   component  - LWC component name (must be registered in app.js ROUTE_COMPONENTS)
 *   title      - Document title (string or (params) => string)
 *   navPage    - Id for nav active state and navigate({ page }) (omit to hide from nav)
 *   navLabel   - Label shown in nav bar and in the Console object switcher
 *   navPath    - Optional; for dynamic routes, path used in nav links (e.g. /users/42)
 *   navHighlight - Optional; nav page id to highlight when this route is active (for child routes that don't create a tab)
 */

export const routes = [
  {
    path: '/',
    component: 'page-home',
    title: 'Home',
  },
  {
    path: '/seller-home',
    component: 'page-seller-home',
    title: 'Início do vendedor',
    navPage: 'seller-home',
    navLabel: 'Home',
  },
  {
    path: '/service-home',
    component: 'page-service-home',
    title: 'Início do agente',
    navPage: 'service-home',
    navLabel: 'Home',
  },
  {
    path: '/icons',
    component: 'page-icon-test',
    title: 'Icons',
  },
  {
    path: '/contacts',
    component: 'page-contacts',
    title: 'Contacts',
    navPage: 'contacts',
    navLabel: 'Contacts',
  },
  {
    path: '/contacts/:id',
    component: 'page-contact-detail',
    title: (params) => `Contact ${params.id}`,
    navHighlight: 'contacts',
  },
  {
    path: '/cases',
    component: 'page-cases',
    title: 'Cases',
    navPage: 'cases',
    navLabel: 'Cases',
  },
  {
    path: '/cases/:id',
    component: 'page-case-detail',
    title: (params) => `Case ${params.id}`,
    navHighlight: 'cases',
  },
  {
    path: '/accounts',
    component: 'page-accounts',
    title: 'Contas',
    navPage: 'accounts',
    navLabel: 'Accounts',
  },
  {
    path: '/accounts/:id',
    component: 'page-account-detail',
    title: (params) => `Conta ${params.id}`,
    navHighlight: 'accounts',
  },
  {
    path: '/personal-accounts',
    component: 'page-personal-accounts',
    title: 'Contas Pessoais',
    navPage: 'personal-accounts',
    navLabel: 'Personal Accounts',
  },
  {
    path: '/personal-accounts/:id',
    component: 'page-personal-account-detail',
    title: (params) => `Conta Pessoal ${params.id}`,
    navHighlight: 'personal-accounts',
  },
  {
    path: '/opportunities',
    component: 'page-pipeline',
    title: 'Pipeline de Vendas',
    navPage: 'opportunities',
    navLabel: 'Opportunities',
  },
  {
    path: '/opportunities/:id',
    component: 'page-opportunity-detail',
    title: (params) => `Oportunidade ${params.id}`,
    navHighlight: 'opportunities',
  },
  {
    path: '/',
    component: 'page-builder',
    title: 'Builder',
    app: 'builder',
  },
];
