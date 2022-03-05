import React from 'react';
import Head from 'next/head';
import { Layout } from '../../../components/layout';
import {
  EntryPathParams,
  EntryWithHtml,
  getAllEntryPathParams,
  getEntryWithHtmlBy,
} from '../../../lib/entry';

export default function Entry({
  entryWithHtml,
}: {
  entryWithHtml: EntryWithHtml;
}) {
  return (
    <Layout>
      <Head>
        <title>{entryWithHtml.title}</title>
      </Head>
      <article>
        <h1>#{entryWithHtml.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: entryWithHtml.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }: { params: EntryPathParams }) {
  const { date, slug } = params;
  const entryWithHtml = await getEntryWithHtmlBy(date, slug);

  return {
    props: {
      entryWithHtml,
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
