import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-gray-100 py-6">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <p className="text-sm text-gray-500">© 2024. All rights reserved.</p>
        <Link
          className="text-sm text-gray-500 hover:text-gray-900"
          href={'/terms-and-conditions'}>
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
