import assert from 'assert';
import { formatISO } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

export type EntryMatter = {
  title: string;
  description: string | null;
  category: string;
  content: string;
  createdAt: string;
};
export type EntryPathParams = {
  date: string;
  slug: string;
  path: string;
};
export type Entry = EntryMatter & EntryPathParams;

export function getAllEntries(filePaths: string[] = getFilePaths()): Entry[] {
  const entries = filePaths.map((filePath) => {
    const entryMatter = getEntryMatter(filePath);
    const entryPathParams = getEntryPathParams(filePath);

    return {
      ...entryPathParams,
      ...entryMatter,
    };
  });

  return entries;
}

export function getAllEntryPathParams(
  filePaths: string[] = getFilePaths()
): EntryPathParams[] {
  return filePaths.map(getEntryPathParams);
}

export async function getEntryBy(date: string, slug: string): Promise<Entry> {
  const fullPath = path.join(contentDir, 'entries', date, slug, 'index.md');
  const entryMatter = getEntryMatter(fullPath);
  const entryPath = path.join('/entries', date, slug);

  return {
    slug,
    date,
    path: entryPath,
    ...entryMatter,
  };
}

function getFilePaths(): string[] {
  const recursiveDir = (dir: string): string[] => {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
      const current = path.join(dir, dirent.name);
      return dirent.isFile() ? [current] : recursiveDir(current);
    });
  };

  const paths = recursiveDir(contentDir);

  return paths.filter((p) => p.endsWith('.md'));
}

function getEntryPathParams(filePath: string): EntryPathParams {
  const match: RegExpMatchArray | null =
    /.+\/entries\/(?<date>\d\d\d\d-\d\d-\d\d)\/(?<slug>.+)\/index.md/.exec(
      filePath
    );

  assert(match?.groups);

  const { date, slug } = match.groups;

  assert(date);
  assert(slug);

  const entryPath = path.join('/entries', date, slug);
  return {
    date,
    slug,
    path: entryPath,
  };
}

function getEntryMatter(fullPath: string): EntryMatter {
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const matterResult = matter(fileContent);
  const content = matterResult.content;
  const { title, description, category, createdAt } = matterResult.data;

  assert(typeof title === 'string');
  assert(typeof category === 'string');
  assert(createdAt instanceof Date);

  return {
    title,
    description: description || null,
    category,
    content,
    createdAt: formatISO(createdAt),
  };
}

export function sortEntryByDateDesc(entries: Entry[]): Entry[] {
  const result = entries.slice();
  result.sort(({ createdAt: a }, { createdAt: b }) => {
    const aDate = Date.parse(a);
    const bDate = Date.parse(b);

    if (aDate < bDate) {
      return 1;
    } else if (aDate > bDate) {
      return -1;
    } else {
      return 0;
    }
  });

  return result;
}
