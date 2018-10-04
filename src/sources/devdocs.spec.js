import { getAvailableDocs, getIndexForSlug } from 'devdocs-client';
import cache from './cache';
import { getSlugs, cachedGetIndexForSlug } from './devdocs';

jest.mock('devdocs-client', () => ({
  getAvailableDocs: jest.fn(),
  getIndexForSlug: jest.fn()
}));

jest.mock('./cache', () => ({
  wrap: jest.fn((_, factory) => factory())
}));

const INDEX = { entries: [{ name: 'Foo', path: 'foo' }] };

beforeAll(() => {
  getAvailableDocs.mockReturnValue(
    Promise.resolve([{ slug: 'react' }, { slug: 'angular' }])
  );
  getIndexForSlug.mockReturnValue(Promise.resolve(INDEX));
});

it('should get slugs via cache', async () => {
  const slugs = await getSlugs();

  expect(cache.wrap.mock.calls[0][0]).toBe('slugs');
  expect(cache.wrap.mock.calls[0][1]).toBeInstanceOf(Function);
  expect(slugs).toEqual(['react', 'angular']);
});

it('should get index via cache', async () => {
  const index = await cachedGetIndexForSlug('foo');

  expect(cache.wrap.mock.calls[0][0]).toBe('index_foo');
  expect(cache.wrap.mock.calls[0][1]).toBeInstanceOf(Function);
  expect(index).toEqual(INDEX);
});
