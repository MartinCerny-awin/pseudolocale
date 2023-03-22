import { getTokens } from './token';
import { pad } from './pad';
import { charactersMapping } from './charactersMapping';

export type Options = {
  prepend?: string;
  append?: string;
  delimiter?: string;
  startDelimiter?: string;
  endDelimiter?: string;
  extend?: number;
  override?: string;
};

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
  const regexTokens = getTokens(str, {
    startDelimiter,
    endDelimiter,
    delimiter,
  });

  let tokenIdx = 0;
  let result = '';
  while (result.length < str.length) {
    const token = regexTokens[tokenIdx];
    const resultLength = result.length;
    if (token && token.index === resultLength) {
      result += token[0];
      tokenIdx++;
      continue;
    }

    const character = override || str[resultLength];
    const convertedCharacter = charactersMapping[character as Letter];

    result += convertedCharacter || character;
  }

  return prepend + pad(result, extend) + append;
}
