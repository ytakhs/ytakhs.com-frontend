import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className="p-8 m-auto max-w-2xl font-mono text-base leading-6 text-left text-black break-words">
      <Head>
        <title>ytakhs.com</title>
      </Head>

      <header>
        <Link href="/">
          <a>ytakhs.com</a>
        </Link>
      </header>

      <main>{children}</main>
    </div>
  );
}
