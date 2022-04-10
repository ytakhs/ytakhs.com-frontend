import React from 'react';
import Head from 'next/head';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSep } from './breadcrumb';

type Props = {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
};

export function Layout({ children, breadcrumb }: Props) {
  return (
    <div className="flex flex-col">
      <Head>
        <title>ytakhs.com</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon-apple-touch.png"
        />
        <link rel="icon" href="/images/favicon-48.png" type="image/png" />
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <link
          rel="alternate"
          href="/feeds/atom.xml"
          type="application/atom+xml"
        />
      </Head>

      <header className="sticky top-0 py-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="px-4 m-auto w-[95%] lg:px-0 lg:w-full lg:max-w-3xl">
          <Breadcrumb>
            <BreadcrumbItem href="/" text="ytakhs.com" />
            {breadcrumb ? (
              <>
                <BreadcrumbSep />
                {breadcrumb}
              </>
            ) : null}
          </Breadcrumb>
        </div>
      </header>

      <main className="px-4 m-auto w-[95%] rounded-md lg:w-full lg:max-w-4xl">
        <div className="m-auto w-full lg:max-w-3xl">{children}</div>
      </main>

      <footer className="p-8"></footer>
    </div>
  );
}
