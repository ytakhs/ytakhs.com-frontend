import React from 'react';

export function List({ children }: { children: React.ReactNode }) {
  return <ul>{children}</ul>;
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}
