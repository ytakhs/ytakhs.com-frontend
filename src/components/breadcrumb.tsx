import React from 'react';
import Link from 'next/link';

type Props = {
  text: string;
  href?: string;
};

export function Breadcrumb({ children }: { children: React.ReactNode }) {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  );
}

export function BreadcrumbItem({ text, href }: Props) {
  return (
    <li className="inline-block">
      {href ? (
        <Link href={href}>
          <a>{text}</a>
        </Link>
      ) : (
        text
      )}
    </li>
  );
}

export function BreadcrumbSep() {
  return <li className="inline-block px-2">/</li>;
}
