import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import { Layout } from '../components/layout';
import { Og } from '../components/og';

export default function Page404() {
  return (
    <>
      <Og
        title="404 - Page Not Found | ytakhs.com"
        description="404 - Page Not Found"
        ogType="website"
        entryPath="/404"
      />
      <Layout>
        <h1>404 - Page Not Found</h1>

        <p>
          <Link href="/">
            <a>
              <span className="inline-flex items-center">
                <ChevronLeftIcon className="w-4 h-4" />
                Back to Top
              </span>
            </a>
          </Link>
        </p>
      </Layout>
    </>
  );
}
