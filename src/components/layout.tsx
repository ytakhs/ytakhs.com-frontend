import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

const pcWidth = 'm-auto lg:max-w-3xl lg:w-full w-10/12';

export function Layout({ children }: Props) {
  return (
    <div className="flex flex-col">
      <Head>
        <title>ytakhs.com</title>
      </Head>

      <header className="sticky top-0 py-4 bg-white dark:bg-slate-800 shadow">
        <div className={`${pcWidth}`}>
          <Link href="/">
            <a>ytakhs.com</a>
          </Link>
        </div>
      </header>

      <main className="py-4 px-8 m-auto my-4 w-[95%] bg-white dark:bg-slate-800 rounded-md shadow-md sm:py-8 lg:w-full lg:max-w-4xl">
        <div className={`${pcWidth} py-2 w-full`}>{children}</div>
      </main>

      <footer className="p-8"></footer>
    </div>
  );
}
