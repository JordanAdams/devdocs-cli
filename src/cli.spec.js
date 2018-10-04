import open from 'open';

import cli from './cli';
import searchSlugs from './render/search-slugs';
import searchPages from './render/search-pages';

jest.mock('open', () => jest.fn());

jest.mock('./render/search-slugs', () =>
  jest.fn(() => Promise.resolve('slug'))
);

jest.mock('./render/search-pages', () =>
  jest.fn(() => Promise.resolve('page'))
);

const run = (args = []) => cli(['node', 'devdocs', ...args]);

it('should search for slugs', async () => {
  await run();

  expect(searchSlugs).toHaveBeenCalled();
});

it('should search slugs using first argument', async () => {
  await run(['myslug']);

  expect(searchSlugs).toHaveBeenCalledWith('myslug');
});

it('should search pages with the chosen slug', async () => {
  await run();

  expect(searchPages).toHaveBeenCalledWith('slug');
});

it('should open the selected page', async () => {
  await run();

  expect(open).toHaveBeenCalledWith('https://devdocs.io/slug/page');
});
