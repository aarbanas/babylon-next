'use client';

import { Navbar } from 'flowbite-react';
import logout from '@/services/auth/logout';
import { usePathname } from 'next/navigation';

const BabylonNavbar = () => {
  const pathname = usePathname();

  return (
    <Navbar fluid={true} rounded={true} className="bg-transparent">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-3xl uppercase font-semibold bg-gradient-to-tl from-slate-100 via-teal-500 to-zinc-100 bg-clip-text text-transparent">
          Babylon
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          href="/profile"
          className="text-white"
          active={pathname === '/profile'}>
          Profil
        </Navbar.Link>
        <Navbar.Link
          onClick={() => {
            logout();
            window.location.href = '/';
          }}
          className="text-white cursor-pointer">
          Odjavi se
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default BabylonNavbar;
