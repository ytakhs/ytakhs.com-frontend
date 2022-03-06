import React from 'react';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { Og } from '../components/og';
import { Entry, getAllEntries, sortEntryByDateDesc } from '../lib/entry';

export default function EntriesPage({ entries }: { entries: Entry[] }) {
  return (
    <>
      <Og
        title="Entries | ytakhs.com"
        description="Entries | ytakhs.com"
        ogType="website"
        entryPath="/entries"
      />

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
    </>
  );
}

export async function getStaticProps() {
  const allEntries = getAllEntries();
  const entries = sortEntryByDateDesc(allEntries);

  return {
    props: {
      entries,
    },
  };
}
