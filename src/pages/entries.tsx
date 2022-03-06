import React from 'react';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { Og } from '../components/og';
import { Entry, getAllEntries, sortEntryByDateDesc } from '../lib/entry';
import { List, ListItem } from '../components/list';

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
          <List>
            {entries.map((entry, i) => {
              return (
                <ListItem key={i}>
                  <Link href={entry.path}>
                    <a>{entry.title}</a>
                  </Link>
                </ListItem>
              );
            })}
          </List>
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
