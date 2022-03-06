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
        <ul>
          <li>
            <Link href="/entries">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="https://github.com/ytakhs">
              <a target="_blank"> GitHub</a>
            </Link>
          </li>
        </ul>
      </Layout>
    </>
  );
};

export default Home;
