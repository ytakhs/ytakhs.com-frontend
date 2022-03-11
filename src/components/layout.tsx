import React from 'react';
import Head from 'next/head';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSep } from './breadcrumb';

type Props = {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
};

const pcWidth = 'm-auto lg:max-w-3xl lg:w-full w-10/12';

export function Layout({ children, breadcrumb }: Props) {
  return (
    <div className="flex flex-col">
      <Head>
        <title>ytakhs.com</title>
      </Head>

      <header className="sticky top-0 py-4 bg-slate-50 dark:bg-slate-900">
        <div className={`${pcWidth}`}>
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

      <main className="px-4 m-auto w-[95%] rounded-md sm:px-8 lg:w-full lg:max-w-4xl">
        <div className={`${pcWidth} w-full`}>{children}</div>
      </main>

      <footer className="p-8"></footer>
    </div>
  );
}
