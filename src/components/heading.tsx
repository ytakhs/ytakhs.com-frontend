import React from 'react';
import { LinkIcon } from '@heroicons/react/solid';

type Props = {
  as: React.ElementType;
  children: React.ReactNode;
  hasAnchor?: boolean;
};

export function Heading({ as, children, hasAnchor }: Props) {
  const Tag = as;

  return (
    <Tag id={hasAnchor ? encodeURI(children?.toString() || '') : null}>
      <span>
        {hasAnchor ? (
          <a href={`#${encodeURI(children?.toString() || '')}`}>
            <LinkIcon className="inline-block mr-2 w-5 h-5" />
          </a>
        ) : null}
      </span>
      {children}
    </Tag>
  );
}
