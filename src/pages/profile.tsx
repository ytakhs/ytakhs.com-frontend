import React from 'react';
import { BreadcrumbItem } from '../components/breadcrumb';
import { H1 } from '../components/heading';
import { Layout } from '../components/layout';
import { Markdown } from '../components/markdown';

const rawMd = `
**WIP**
`;

export default function Profile() {
  return (
    <>
      <Layout breadcrumb={<BreadcrumbItem href="/profile" text="profile" />}>
        <H1>Profile</H1>
        <article>
          <Markdown rawMd={rawMd} />
        </article>
      </Layout>
    </>
  );
}
