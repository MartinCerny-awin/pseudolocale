#!/usr/bin/env node

import { Command } from 'commander';
import pseudolocale from './index';
import fs from 'node:fs/promises';
import path from 'node:path';
import { version } from '../package.json';
import type { Options } from './str';

type CliOptions = {
  string: string;
  readFile: string;
  writeFile: string;
} & Options;

export function makeProgram(): Command {
  const program = new Command();

  program
    .version(version)
    .option('-d, --delimiter <val>', "sets the token delimiter (default: '%')")
    .option(
      '-S, --startDelimiter <val>',
      'sets the start token delimiter (default: delimiter)',
    )
    .option(
      '-E, --endDelimiter <val>',
      'sets the end token delimiter (default: delimiter)',
    )
    .option('-p, --prepend <val>', "sets the string start tag (default: '[!!')")
    .option('-a, --append <val>', "sets the string end tag (default: '!!]')")
    .option(
      '-e, --extend <amount>',
      "sets the padding percentage (default: '0')",
      parseFloat,
    )
    .option(
      '-o, --override <char>',
      'replaces all characters with specified character',
    )
    .option('-s, --string <str>', 'string to pseudolocalize')
    .option('-r, --readFile <path>', 'path to file to pseudolocalize')
    .option('-w, --writeFile <path>', 'path of file to write results to');

  program
    .on('--help', () => {
      console.log('  Examples:');
      console.log('');

      console.log('  Custom start and end tags');
      console.log("    $ pseudolocale -p '[@@' -a '@@]' -s 'test'");
      console.log(
        '    > ' + pseudolocale('test', { prepend: '[@@', append: '@@]' }),
      );
      console.log('');

      const overrideOptions = {
        override: '_',
        prepend: '',
        append: '',
      };
      console.log(
        '  Replace strings with underscore to spot unlocalized strings',
      );
      console.log("    $ pseudolocale -p '' -a '' -o '_' -s 'test'");
      console.log('    > ' + pseudolocale('test', overrideOptions));
      console.log('');

      console.log('  Extend strings to ensure space for localization');
      console.log("    $ pseudolocale -e 0.3 -s 'test string'");
      console.log('    > ' + pseudolocale('test string', { extend: 0.3 }));
      console.log('');

      console.log('  Pseudolocalize all strings in a JSON file');
      console.log('    $ pseudolocale -r example.json -w example-pseudo.json');
      console.log('');
    })
    .action(() => command(program));

  return program;
}

async function command(program: Command) {
  const cliOptions = program.opts<CliOptions>();

  if (!cliOptions.string && !cliOptions.readFile) {
    console.log('  Either a string (-s) or a file (-r) must be specified.');
    program.help();
  }

  if (cliOptions.string) {
    console.log(pseudolocale(cliOptions.string, cliOptions));
    return;
  }

  try {
    const data = await fs.readFile(cliOptions.readFile, { encoding: 'utf8' });

    const result = JSON.stringify(
      JSON.parse(data),
      (key, value) => {
        if (typeof value === 'string') {
          return pseudolocale(value, cliOptions);
        }
        return value;
      },
      2,
    );

    const dir = path.dirname(cliOptions.readFile);
    const ext = path.extname(cliOptions.readFile);
    const base = path.basename(cliOptions.readFile, ext);
    const out = cliOptions.writeFile || path.join(dir, base + '-pseudo' + ext);

    try {
      await fs.mkdir(path.dirname(out), { recursive: true });
      await fs.writeFile(out, result);
    } catch (e) {
      console.error('  Unable to write file [' + out + '].');
      return;
    }
  } catch (e) {
    console.error('  Unable to read file [' + cliOptions.readFile + '].');
    return;
  }
}
