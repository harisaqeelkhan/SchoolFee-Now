export const ROLE_REDIRECTS = {
  system_admin: '/system/dashboard',
  school_admin: '/admin/dashboard',
  student: '/student/dashboard',
  parent: '/dashboard',
};

export const getDefaultRouteForRole = (role) => {
  return ROLE_REDIRECTS[role] || '/login';
};
