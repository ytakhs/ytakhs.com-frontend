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
        <ul>
          <li>
            <Link href="/entries">
              <a>
                <div className="py-4 border-b ">
                  <span className="inline-flex items-center">
                    Writing <ChevronRightIcon className="mx-2 w-5 h-5" />
                  </span>
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a>
                <div className="py-4 border-b ">
                  <span className="inline-flex items-center">
                    Profile <ChevronRightIcon className="mx-2 w-5 h-5" />
                  </span>
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://github.com/ytakhs">
              <a target="_blank">
                <div className="py-4 border-b">
                  <span className="inline-flex items-center">
                    GitHub <ExternalLinkIcon className="mx-2 w-5 h-5" />
                  </span>
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/ytakhs">
              <a target="_blank">
                <div className="py-4 border-b">
                  <span className="inline-flex items-center">
                    Twitter <ExternalLinkIcon className="mx-2 w-5 h-5" />
                  </span>
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </Layout>
    </>
  );
};

export default Home;
