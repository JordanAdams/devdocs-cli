import autoCompletePrompt from 'inquirer-autocomplete-prompt';
import inquirer from 'inquirer';
import fuzzy from 'fuzzy';
import { cachedGetIndexForSlug } from '../sources/devdocs';

inquirer.registerPrompt('autocomplete', autoCompletePrompt);

export default async slug => {
  const index = await cachedGetIndexForSlug(slug);

  const pages = index.entries.reduce(
    (acc, { name, path }) => Object.assign({}, acc, { [name]: path }),
    {}
  );

  const { page } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'page',
      message: 'Search Pages:',
      source: async (_, input) =>
        Promise.resolve(fuzzy.simpleFilter(input || '', Object.keys(pages)))
    }
  ]);

  return pages[page];
};
