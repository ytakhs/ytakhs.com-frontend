import React from 'react';
import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import { Og } from '../components/og';
import Link from 'next/link';

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
            </li>
            <li className="py-4">
              <Link href="https://github.com/ytakhs">
                <a target="_blank"> GitHub</a>
              </Link>
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
};

export default Home;
