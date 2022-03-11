import React from 'react';
import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import { Og } from '../components/og';
import Link from 'next/link';
import { ExternalLinkIcon, ChevronRightIcon } from '@heroicons/react/solid';

const Home: NextPage = () => {
  return (
    <>
      <Og
        title="ytakhs.com"
        description="ytakhs.com"
        ogType="website"
        entryPath=""
      />

      <Layout>
        <h1 className="hidden">ytakhs.com</h1>
        <div className="my-4 border-y">
          <ul className="px-2">
            <li className="py-4">
              <Link href="/entries">
                <a>Blog</a>
              </Link>
              <ChevronRightIcon className="inline w-5 h-5" />
            </li>
            <li className="py-4">
              <Link href="https://github.com/ytakhs">
                <a target="_blank"> GitHub</a>
              </Link>
              <ExternalLinkIcon className="inline w-5 h-5" />
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
};

export default Home;
