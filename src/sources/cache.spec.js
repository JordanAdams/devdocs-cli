import cacheManager from 'cache-manager';
import cacheManagerFS from 'cache-manager-fs';

jest.mock('cache-manager', () => ({
  caching: jest.fn()
}));

jest.mock('cache-manager-fs', () => class CacheManagerFS {});

jest.mock('os', () => ({
  homedir: () => '/Users/foo'
}));

it('should create a new cache', () => {
  require.requireActual('./cache');

  expect(cacheManager.caching).toHaveBeenCalled();
  expect(cacheManager.caching.mock.calls[0][0]).toMatchObject({
    store: cacheManagerFS,
    options: { path: '/Users/foo/.devdocs-cli/cache' }
  });
});
