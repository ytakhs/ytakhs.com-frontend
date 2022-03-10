import React from 'react';
import Link from 'next/link';

type Props = {
  text: string;
  href?: string;
};

export function BreadcrumbItem({ text, href }: Props) {
  return (
    <span className="inline-block">
      {href ? (
        <Link href={href}>
          <a>{text}</a>
        </Link>
      ) : (
        text
      )}
    </span>
  );
}

export function BreadcrumbSep() {
  return <span className="inline-block px-2">/</span>;
}
