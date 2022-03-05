import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div>
      <Head>
        <title>ytakhs.com</title>
      </Head>

      <header className="py-4">
        <Link href="/">
          <a>ytakhs.com</a>
        </Link>
      </header>

      <main>{children}</main>
    </div>
  );
}
