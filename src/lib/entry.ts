import assert from 'assert';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const contentDir = path.join(process.cwd(), 'content');

export type EntryMatter = {
  title: string;
  createdAt: Date;
  category: string;
  content: string;
};
export type EntryPathParams = {
  date: string;
  slug: string;
};
export type Entry = EntryMatter & EntryPathParams;
export type EntryWithHtml = Omit<Entry, 'createdAt'> & {
  contentHtml: string;
};

export function getAllEntries(filePaths: string[] = getFilePaths()): Entry[] {
  const entries = filePaths.map((filePath) => {
    const match: RegExpMatchArray | null =
      /.+\/entries\/(?<date>\d\d\d\d-\d\d-\d\d)\/(?<slug>.+).md/.exec(filePath);

    const fullPath = path.join(contentDir, filePath);
    const entryMatter = getEntryMatter(fullPath);

    assert(match?.groups);

    const { date, slug } = match.groups;

    assert(date);
    assert(slug);

    return {
      date,
      slug,
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

    return {
      date,
      slug,
    };
  });
}

export function sortEntriesByDate(entries: Entry[]): void {
  entries.sort(({ createdAt: a }, { createdAt: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export async function getEntryWithHtmlBy(
  date: string,
  slug: string
): Promise<EntryWithHtml> {
  const fullPath = path.join(contentDir, 'entries', date, `${slug}.md`);
  const entryMatter = getEntryMatter(fullPath);

  const processedContent = await remark()
    .use(html)
    .process(entryMatter.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    date,
    title: entryMatter.title,
    category: entryMatter.category,
    content: entryMatter.content,
    contentHtml,
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
  const { title, date, category } = matterResult.data;

  assert(typeof title === 'string');
  assert(typeof category === 'string');
  assert(date instanceof Date);

  return {
    title,
    category,
    createdAt: date,
    content,
  };
}
