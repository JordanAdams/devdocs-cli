import inquirer from 'inquirer';
import searchSlugs from './search-slugs';
import { getSlugs } from '../sources/devdocs';

jest.mock('inquirer-autocomplete-prompt', () => class AutocompletePrompt {});

jest.mock('inquirer', () => ({
  prompt: jest.fn(() => Promise.resolve({ slug: 'slug' })),
  registerPrompt: jest.fn()
}));

jest.mock('fuzzy', () => ({
  simpleFilter: jest.fn((term, list) => list.filter(item => item === term))
}));

jest.mock('../sources/devdocs', () => ({
  getSlugs: jest.fn(() => Promise.resolve(['foo', 'bar', 'baz']))
}));

jest.mock('chalk', () => ({ red: str => str }));

it('should get the available slugs', async () => {
  await searchSlugs();
  expect(getSlugs).toHaveBeenCalled();
});

it('should get display a prompt', async () => {
  await searchSlugs();

  expect(inquirer.prompt).toHaveBeenCalled();

  const [{ type }] = inquirer.prompt.mock.calls[0][0];

  expect(type).toBe('autocomplete');
});

it('should search slugs', async () => {
  await searchSlugs();

  const [{ source }] = inquirer.prompt.mock.calls[0][0];

  expect(source(null, 'foo')).toEqual(['foo']);
  expect(source(null, 'bar')).toEqual(['bar']);
  expect(source(null, 'baz')).toEqual(['baz']);
  expect(source(null, null)).toEqual([]);
});

it('should use the passed slug', async () => {
  await searchSlugs();

  const [{ source }] = inquirer.prompt.mock.calls[0][0];

  expect(source(null, 'foo')).toEqual(['foo']);
  expect(source(null, 'bar')).toEqual(['bar']);
  expect(source(null, 'baz')).toEqual(['baz']);
  expect(source(null, null)).toEqual([]);
});

it("should return the passed slug if it's valid", async () => {
  expect(await searchSlugs('foo')).toBe('foo');
  expect(await searchSlugs('bar')).toBe('bar');
  expect(await searchSlugs('baz')).toBe('baz');
});

it("should output a message if it's not valid", async () => {
  const stdout = [];
  const originalConsole = global.console;
  global.console.log = str => stdout.push(str);

  await searchSlugs('not_a_slug');
  expect(stdout).toEqual(['✘ Unable to find docs for not_a_slug']);

  global.console = originalConsole;
});
