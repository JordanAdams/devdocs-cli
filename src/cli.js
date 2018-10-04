import open from 'open';
import searchSlugs from './render/search-slugs';
import searchPages from './render/search-pages';

export default async argv => {
  const args = argv.slice(2);

  const slug = await searchSlugs(args[0]);
  const page = await searchPages(slug);

  open(`https://devdocs.io/${slug}/${page}`);
};
