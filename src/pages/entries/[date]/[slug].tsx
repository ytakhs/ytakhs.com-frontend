import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Head from 'next/head';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Layout } from '../../../components/layout';
import {
  EntryPathParams,
  Entry,
  getAllEntryPathParams,
  getEntryBy,
} from '../../../lib/entry';

export default function EntryPage({ entry }: { entry: Entry }) {
  return (
    <Layout>
      <Head>
        <title>{entry.title}</title>
      </Head>
      <article>
        <h1>{entry.title}</h1>
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
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {entry.content}
        </ReactMarkdown>
      </article>
    </Layout>
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
