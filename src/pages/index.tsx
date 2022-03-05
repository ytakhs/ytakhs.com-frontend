import React from 'react';
import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
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
  );
};

export default Home;
