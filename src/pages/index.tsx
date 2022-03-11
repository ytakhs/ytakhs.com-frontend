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
        <div className="my-4">
          <ul className="px-2">
            <li>
              <Link href="/entries">
                <a>
                  <div className="py-4 border-b">
                    Blog <ChevronRightIcon className="inline w-5 h-5" />
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/ytakhs">
                <a target="_blank">
                  <div className="py-4 border-b">
                    GitHub <ExternalLinkIcon className="inline w-5 h-5" />
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
};

export default Home;
