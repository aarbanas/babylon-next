'use client';
import React from 'react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NotFoundPage = (): React.JSX.Element => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-950">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-8 text-xl">
        Oops! Nešto je pošlo po zlu! Stranica koju pokušavate pronaći ne
        postoji.
      </p>
      <Link href="/" passHref>
        <Button variant="default">Return to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
