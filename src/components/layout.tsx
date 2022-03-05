import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

const pcWidth = 'm-auto sm:max-w-3xl';

export function Layout({ children }: Props) {
  return (
    <div className="flex flex-col flex-1">
      <Head>
        <title>ytakhs.com</title>
      </Head>

      <header className="sticky top-0 py-4 bg-white dark:bg-neutral-800 shadow">
        <div className={`${pcWidth} px-4`}>
          <Link href="/">
            <a>ytakhs.com</a>
          </Link>
        </div>
      </header>

      <main className="p-8 m-auto my-4 w-full max-w-4xl min-h-screen bg-white dark:bg-neutral-800 rounded-md shadow-md">
        <div className={`${pcWidth} py-4 w-full`}>{children}</div>
      </main>
      <footer className="p-8"></footer>
    </div>
  );
}
