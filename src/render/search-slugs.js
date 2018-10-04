import autoCompletePrompt from 'inquirer-autocomplete-prompt';
import inquirer from 'inquirer';
import fuzzy from 'fuzzy';
import { red } from 'chalk';
import { getSlugs } from '../sources/devdocs';

inquirer.registerPrompt('autocomplete', autoCompletePrompt);

export default async (passedSlug = '') => {
  const slugs = await getSlugs();

  if (passedSlug && slugs.includes(passedSlug)) {
    return passedSlug;
  }

  if (passedSlug) {
    console.log(red(`✘ Unable to find docs for ${passedSlug}`));
  }

  const { slug } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'slug',
      message: 'Search Docs:',
      source: (_, input) =>
        Promise.resolve(fuzzy.simpleFilter(input || '', slugs))
    }
  ]);

  return slug;
};
