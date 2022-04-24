import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import { Layout } from '../components/layout';
import { Og } from '../components/og';
import { H1 } from '../components/heading';

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
        <H1>404 - Page Not Found</H1>

        <p>
          <Link href="/">
            <a>
              <span className="inline-flex items-center">
                <ChevronLeftIcon className="mx-2 w-5 h-5" />
                Back to Top
              </span>
            </a>
          </Link>
        </p>
      </Layout>
    </>
  );
}
