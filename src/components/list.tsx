import React from 'react';

export function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-none">{children}</ul>;
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="py-4 border-b">{children}</li>;
}

export function ListMeta({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm text-slate-600 dark:text-slate-400">{children}</div>
  );
}
