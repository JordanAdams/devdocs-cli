import { getAvailableDocs, getIndexForSlug } from 'devdocs-client';
import cache from './cache';

export const getSlugs = async () =>
  cache.wrap('slugs', () =>
    getAvailableDocs().then(docs => docs.map(({ slug }) => slug))
  );

export const cachedGetIndexForSlug = async slug =>
  cache.wrap(`index_${slug}`, () => getIndexForSlug(slug));
