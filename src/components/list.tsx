import React from 'react';

export function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-none">{children}</ul>;
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="py-4 border-b">{children}</li>;
}
