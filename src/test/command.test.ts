import { makeProgram } from '../command';
import path from 'node:path';
import fs from 'node:fs/promises';
import os from 'node:os';

describe('Command', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should support --string param', async () => {
    const program = makeProgram();

    const spy = jest.spyOn(console, 'log').mockImplementation();

    await program.parseAsync(
      ['--string', 'This is going to be pseudolocalized %token%.'],
      { from: 'user' },
    );

    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[!!Ţĥĩś ĩś ĝōĩńĝ ţō ƀē ƥśēũďōĺōćàĺĩźēď %token%.!!]",
        ],
      ]
    `);
  });

  it('Should pseudolocalize files', async () => {
    const program = makeProgram();

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    const tmpDir = await fs.mkdtemp(
      path.join(os.tmpdir(), `lingui-test-${process.pid}`),
    );

    const actualFilename = path.join(tmpDir, './example-pseudo.json');

    await program.parseAsync(
      [
        '--readFile',
        path.join(__dirname, './fixtures/example.json'),
        '--writeFile',
        actualFilename,
      ],
      { from: 'user' },
    );

    const actual = await fs.readFile(actualFilename, 'utf-8');
    expect(actual).toMatchInlineSnapshot(`
      "{
        "string1": "[!!ţĥĩś ĩś ţĥē ƒĩŕśţ śţŕĩńĝ!!]",
        "string2": "[!!à śţŕĩńĝ ŵĩţĥ à %token%!!]",
        "string3": "[!!à śţŕĩńĝ ŵĩţĥ à %couple% ōƒ %tokens%!!]",
        "numbers": 123456790,
        "array": [
          "[!!ţĥĩś ĩś ţĥē śţŕĩńĝ ĩń àŕŕàŷ!!]",
          "[!!ţĥĩś ĩś ţĥē śēćōńď śţŕĩńĝ ĩń àŕŕàŷ!!]"
        ],
        "deep1": {
          "string1": "[!!ţĥĩś ĩś ţĥē śēćōńď śţŕĩńĝ!!]",
          "string2": "[!!à śţŕĩńĝ ŵĩţĥ à %token%!!]",
          "string3": "[!!à śţŕĩńĝ ŵĩţĥ à %couple% ōƒ %tokens%!!]",
          "deep2": {
            "string1": "[!!ţĥĩś ĩś ţĥē ţĥĩŕď śţŕĩńĝ!!]",
            "string2": "[!!à śţŕĩńĝ ŵĩţĥ à %token%!!]",
            "string3": "[!!à śţŕĩńĝ ŵĩţĥ à %couple% ōƒ %tokens%!!]"
          }
        }
      }"
    `);
    expect(logSpy).not.toBeCalled();
    expect(errorSpy).not.toBeCalled();
  });
});
