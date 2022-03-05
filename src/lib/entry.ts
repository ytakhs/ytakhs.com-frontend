import assert from 'assert';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const contentDir = path.join(process.cwd(), 'content');

type EntryMatter = {
  title: string;
  date: Date;
  category: string;
  content: string;
};
type Entry = EntryMatter & { id: string };
type EntryWithHtml = Entry & { contentHtml: string };

export function getAllEntries(
  filePaths: string[] = fs.readdirSync(contentDir)
): Entry[] {
  const entries = filePaths.map((filePath) => {
    const id = filePath.replace(/\.md/, '');
    const fullPath = path.join(contentDir, filePath);
    const entryMatter = getEntryMatter(fullPath);

    return {
      id,
      ...entryMatter,
    };
  });

  return entries;
}

export function sortEntriesByDate(entries: Entry[]): void {
  entries.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export async function getEntryById(id: string): Promise<EntryWithHtml> {
  const fullPath = path.join(contentDir, `${id}.md`);
  const entryMatter = getEntryMatter(fullPath);

  const processedContent = await remark()
    .use(html)
    .process(entryMatter.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    ...entryMatter,
    contentHtml,
  };
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
    date,
    content,
  };
}
