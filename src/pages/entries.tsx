import Link from 'next/link';
import React from 'react';
import { Layout } from '../components/layout';
import { Entry, getAllEntries } from '../lib/entry';

export default function EntriesPage({ entries }: { entries: Entry[] }) {
  return (
    <Layout>
      <section>
        <ul>
          {entries.map((entry, i) => {
            return (
              <li key={i}>
                <Link href={entry.path}>
                  <a>{entry.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const entries = getAllEntries();

  return {
    props: {
      entries,
    },
  };
}
