import inquirer from 'inquirer';
import searchPages from './search-pages';
import { cachedGetIndexForSlug } from '../sources/devdocs';

jest.mock('inquirer-autocomplete-prompt', () => class AutocompletePrompt {});

jest.mock('inquirer', () => ({
  prompt: jest.fn(() => Promise.resolve({ page: 'Foo' })),
  registerPrompt: jest.fn()
}));

jest.mock('fuzzy', () => ({
  simpleFilter: jest.fn((term, list) => list.filter(item => item === term))
}));

jest.mock('../sources/devdocs', () => ({
  cachedGetIndexForSlug: jest.fn(() =>
    Promise.resolve({
      entries: [{ name: 'Foo', path: 'foo' }, { name: 'Bar', path: 'bar' }]
    })
  )
}));

it('should get index for the given slug', async () => {
  const slug = 'foo';
  await searchPages(slug);
  expect(cachedGetIndexForSlug).toHaveBeenCalledWith(slug);
});

it('should get display a prompt', async () => {
  await searchPages('foo');

  expect(inquirer.prompt).toHaveBeenCalled();

  const [{ type }] = inquirer.prompt.mock.calls[0][0];

  expect(type).toBe('autocomplete');
});

it('should search entries', async () => {
  await searchPages('foo');

  const [{ source }] = inquirer.prompt.mock.calls[0][0];

  expect(source(null, 'Foo')).toEqual(['Foo']);
  expect(source(null, 'Bar')).toEqual(['Bar']);
  expect(source(null, null)).toEqual([]);
});

it('should return page for result', async () => {
  const path = await searchPages('foo');
  expect(path).toBe('foo');
});
