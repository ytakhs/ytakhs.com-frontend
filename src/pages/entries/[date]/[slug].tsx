import React from 'react';
import path from 'path';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Head from 'next/head';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { BreadcrumbItem } from '../../../components/breadcrumb';
import { Layout } from '../../../components/layout';
import { Og } from '../../../components/og';
import {
  EntryPathParams,
  Entry,
  getAllEntryPathParams,
  getEntryBy,
} from '../../../lib/entry';
import { Date } from '../../../components/date';

export default function EntryPage({ entry }: { entry: Entry }) {
  return (
    <>
      <Og
        title={entry.title}
        description={entry.title}
        ogType="article"
        entryPath={entry.path}
      />

      <Layout breadcrumb={<BreadcrumbItem href="/entries" text="entries" />}>
        <Head>
          <title>{entry.title}</title>
        </Head>
        <article>
          <h1>{entry.title}</h1>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <span className="pr-2">Created at:</span>
            <Date dateString={entry.createdAt}></Date>
          </div>
          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '') || '';
                return !inline ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="py-0.5 px-1 dark:text-slate-800 bg-slate-300 dark:bg-slate-400 rounded"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              img({ src, alt }) {
                const imgSrc = path.join(
                  '/entries',
                  entry.date,
                  entry.slug,
                  src || ''
                );
                const [_alt, ...rest] = (alt || '').split(' ');

                return (
                  <figure>
                    {/* eslint-disable-next-line */}
                    <img src={imgSrc} alt={_alt} />
                    {rest[0] ? <figcaption>{rest[0]}</figcaption> : null}
                  </figure>
                );
              },
              a({ href, children }) {
                let aProps = {};
                if (href?.startsWith('http')) {
                  aProps = {
                    ...{ target: '_blank', rel: 'nofollow' },
                    ...aProps,
                  };
                }

                return (
                  <Link href={href || ''}>
                    <a className="border-b" {...aProps}>
                      {children}
                    </a>
                  </Link>
                );
              },
              ul({ children }) {
                return (
                  <ul className="block py-2 pl-6 list-disc">{children}</ul>
                );
              },
              li({ children }) {
                return (
                  <li className="list-item leading-relaxed">{children}</li>
                );
              },
            }}
          >
            {entry.content}
          </ReactMarkdown>
        </article>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }: { params: EntryPathParams }) {
  const { date, slug } = params;
  const entry = await getEntryBy(date, slug);

  return {
    props: {
      entry,
    },
  };
}

export async function getStaticPaths() {
  const entryPaths = getAllEntryPathParams();

  return {
    paths: entryPaths.map((entryPathParams) => {
      return {
        params: {
          ...entryPathParams,
        },
      };
    }),
    fallback: false,
  };
}
