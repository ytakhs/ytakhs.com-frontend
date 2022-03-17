import React from 'react';
import path from 'path';
import Head from 'next/head';
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
import { Markdown } from '../../../components/markdown';

export default function EntryPage({ entry }: { entry: Entry }) {
  return (
    <>
      <Og
        title={entry.title}
        description={entry.description || entry.title}
        ogType="article"
        entryPath={entry.path}
      />

      <Layout breadcrumb={<BreadcrumbItem href="/entries" text="entries" />}>
        <Head>
          <title>{entry.title}</title>
        </Head>
        <article>
          <h1 className="py-4">{entry.title}</h1>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <span className="pr-2">Created at:</span>
            <Date dateString={entry.createdAt}></Date>
          </div>
          <Markdown
            rawMd={entry.content}
            imgPrefix={path.join('/entries', entry.date, entry.slug)}
          />
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
