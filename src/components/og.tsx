import React from 'react';
import Head from 'next/head';

type OgProps = {
  title: string;
  description: string;
  entryPath: string;
  ogType: 'website' | 'article';
};

export function Og({ title, description, entryPath, ogType }: OgProps) {
  const baseURL = 'https://ytakhs.com';

  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`${baseURL}${entryPath}/`} />
      <meta property="og:image" content={`${baseURL}/images/og-image.png`} />
      <meta property="twitter:card" content="summary" />
    </Head>
  );
}
