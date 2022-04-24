import path from 'path';
import React from 'react';
import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { H1, H2, H3, H4, H5, H6 } from './heading';

type Props = {
  rawMd: string;
  imgPrefix?: string;
  headingWithAnchor?: boolean;
};

export function Markdown({ rawMd, imgPrefix, headingWithAnchor }: Props) {
  return (
    <ReactMarkdown
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '') || '';
          return !inline ? (
            <SyntaxHighlighter
              style={atomDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className="py-0.5 px-1 dark:text-neutral-800 bg-neutral-300 dark:bg-neutral-400 rounded"
              {...props}
            >
              {children}
            </code>
          );
        },
        img({ src, alt }) {
          let imgSrc = src || '';
          if (imgPrefix) {
            imgSrc = path.join(imgPrefix, imgSrc);
          }
          const [_alt, ...rest] = (alt || '').split(' ');

          return (
            <figure>
              {/* eslint-disable-next-line */}
              <img src={imgSrc} alt={_alt} />
              {rest[0] ? <figcaption>{rest[0]}</figcaption> : null}
            </figure>
          );
        },
        a({ href, children }) {
          let aProps = {};
          if (href?.startsWith('http')) {
            aProps = {
              ...{ target: '_blank', rel: 'nofollow' },
              ...aProps,
            };
          }

          return (
            <Link href={href || ''}>
              <a className="border-b" {...aProps}>
                {children}
              </a>
            </Link>
          );
        },
        blockquote({ children }) {
          return (
            <blockquote className="pl-3 ml-2 rounded-l-sm border-l-4 border-neutral-400">
              {children}
            </blockquote>
          );
        },
        ul({ children }) {
          return <ul className="block pl-6 list-disc">{children}</ul>;
        },
        h1({ children }) {
          return H1({
            children,
            hasAnchor: headingWithAnchor || true,
          });
        },
        h2({ children }) {
          return H2({
            children,
            hasAnchor: headingWithAnchor || true,
          });
        },
        h3({ children }) {
          return H3({ children });
        },
        h4({ children }) {
          return H4({ children });
        },
        h5({ children }) {
          return H5({ children });
        },
        h6({ children }) {
          return H6({ children });
        },
      }}
    >
      {rawMd}
    </ReactMarkdown>
  );
}
