import assert from 'assert';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

export type EntryMatter = {
  title: string;
  category: string;
  content: string;
};
export type EntryPathParams = {
  date: string;
  slug: string;
  path: string;
};
export type Entry = EntryMatter & EntryPathParams;

export function getAllEntries(filePaths: string[] = getFilePaths()): Entry[] {
  const entries = filePaths.map((filePath) => {
    const match: RegExpMatchArray | null =
      /.+\/entries\/(?<date>\d\d\d\d-\d\d-\d\d)\/(?<slug>.+).md/.exec(filePath);

    const entryMatter = getEntryMatter(filePath);

    assert(match?.groups);

    const { date, slug } = match.groups;

    assert(date);
    assert(slug);

    const entryPath = path.join('/entries', date, slug);

    return {
      date,
      slug,
      path: entryPath,
      ...entryMatter,
    };
  });

  return entries;
}

export function getAllEntryPathParams(
  filePaths: string[] = getFilePaths()
): EntryPathParams[] {
  return filePaths.map((filePath) => {
    const match: RegExpMatchArray | null =
      /.+\/entries\/(?<date>\d\d\d\d-\d\d-\d\d)\/(?<slug>.+).md/.exec(filePath);

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
  });
}

export async function getEntryBy(date: string, slug: string): Promise<Entry> {
  const fullPath = path.join(contentDir, 'entries', date, `${slug}.md`);
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

function getEntryMatter(fullPath: string): EntryMatter {
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const matterResult = matter(fileContent);
  const content = matterResult.content;
  const { title, category } = matterResult.data;

  assert(typeof title === 'string');
  assert(typeof category === 'string');

  return {
    title,
    category,
    content,
  };
}
