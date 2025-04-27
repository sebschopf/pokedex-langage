export const routes = {
  home: '/',
  languages: {
    index: '/languages',
    detail: (slug: string) => `/languages/${slug}`,
    detailById: (id: number | string) => `/languages/id/${id}`,
  },
  frameworks: {
    index: '/frameworks',
    detail: (slug: string) => `/frameworks/${slug}`,
  },
  libraries: {
    index: '/libraries',
    detail: (slug: string) => `/libraries/${slug}`,
  },
  categories: {
    index: '/categories',
    detail: (id: number | string) => `/categories/${id}`,
  },
  auth: {
    login: '/login',
    register: '/register',
    profile: '/profile',
  },
  admin: {
    dashboard: '/admin/dashboard',
    languages: '/admin/languages',
    frameworks: '/admin/frameworks',
    libraries: '/admin/libraries',
    users: '/admin/users',
    suggestions: '/admin/suggestions',
  },
};
