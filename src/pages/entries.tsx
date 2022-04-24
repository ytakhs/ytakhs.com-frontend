import React from 'react';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { Og } from '../components/og';
import { Entry, getAllEntries, sortEntryByDateDesc } from '../lib/entry';
import { BreadcrumbItem } from '../components/breadcrumb';
import { Date } from '../components/date';
import { createAtomFeedFile } from '../lib/feed';
import { H1 } from '../components/heading';

export default function EntriesPage({ entries }: { entries: Entry[] }) {
  return (
    <>
      <Og
        title="Writing | ytakhs.com"
        description="Writing | ytakhs.com"
        ogType="website"
        entryPath="/entries"
      />

      <Layout breadcrumb={<BreadcrumbItem href="/entries" text="writings" />}>
        <H1>Writings</H1>
        <section>
          <ul>
            {entries.map((entry, i) => {
              return (
                <li key={i}>
                  <Link href={entry.path}>
                    <a>
                      <div className="py-4 border-b">
                        {entry.title}
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          <Date dateString={entry.createdAt} />
                        </div>
                      </div>
                    </a>
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

  createAtomFeedFile(entries);

  return {
    props: {
      entries,
    },
  };
}
