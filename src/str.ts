import { escapeRegExp } from './escapeRegExp';
import { pad } from './pad';
import { table } from './table';

interface Options {
  prepend?: string;
  append?: string;
  delimiter?: string;
  startDelimiter?: string;
  endDelimiter?: string;
  extend?: number;
  override?: string;
}

const defaultOptions = {
  prepend: '[!!',
  append: '!!]',
  delimiter: '%',
  startDelimiter: '',
  endDelimiter: '',
  extend: 0,
  override: undefined,
};

type Letter =
  | 'A'
  | 'a'
  | 'B'
  | 'b'
  | 'C'
  | 'c'
  | 'D'
  | 'd'
  | 'E'
  | 'e'
  | 'F'
  | 'f'
  | 'G'
  | 'g'
  | 'H'
  | 'h'
  | 'I'
  | 'i'
  | 'J'
  | 'j'
  | 'K'
  | 'k'
  | 'L'
  | 'l'
  | 'N'
  | 'n'
  | 'O'
  | 'o'
  | 'P'
  | 'p'
  | 'Q'
  | 'q'
  | 'R'
  | 'r'
  | 'S'
  | 's'
  | 'T'
  | 't'
  | 'U'
  | 'u'
  | 'W'
  | 'w'
  | 'Y'
  | 'y'
  | 'Z'
  | 'z';

export default function str(str: string, customOptions?: Options): string {
  const {
    startDelimiter,
    endDelimiter,
    delimiter,
    prepend,
    append,
    extend,
    override,
  } = { ...defaultOptions, ...customOptions };
  const startEscapedDelimiter = escapeRegExp(startDelimiter || delimiter);
  const endEscapedDelimiter = escapeRegExp(endDelimiter || delimiter);
  const re = new RegExp(
    `${startEscapedDelimiter}.*?${endEscapedDelimiter}`,
    'g',
  );
  let m;
  const tokens = [];
  let i = 0;
  let tokenIdx = 0;
  let result = '';
  let c;
  let pc;

  while ((m = re.exec(str))) {
    tokens.push(m);
  }

  let token = tokens[tokenIdx++] || { index: -1 };
  while (i < str.length) {
    if (token.index === i) {
      result += token[0];
      i += token[0].length;
      token = tokens[tokenIdx++] || { index: -1 };
      continue;
    }

    c = override !== undefined ? override : str[i];
    pc = table[c as Letter];
    if (pc) {
      const diacriticalIndex = str.length % pc.length;
      c = pc[diacriticalIndex];
    }
    result += c;
    i++;
  }

  return prepend + pad(result, extend) + append;
}
