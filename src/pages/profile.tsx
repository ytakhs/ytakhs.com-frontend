import React from 'react';
import { BreadcrumbItem } from '../components/breadcrumb';
import { Layout } from '../components/layout';
import { Markdown } from '../components/markdown';

const rawMd = `
**WIP**
`;

export default function Profile() {
  return (
    <>
      <Layout breadcrumb={<BreadcrumbItem href="/profile" text="profile" />}>
        <h1>Profile</h1>
        <article>
          <Markdown rawMd={rawMd} />
        </article>
      </Layout>
    </>
  );
}
