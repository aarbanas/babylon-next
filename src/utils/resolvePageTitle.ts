export const resolvePageTitle = (pathname: string): string => {
  if (pathname === '/dashboard') return 'Početna';
  else if (pathname === '/profile') return 'Profil';
  else if (pathname.includes('/user-profile')) return 'Podaci o korisniku';

  return '';
};
