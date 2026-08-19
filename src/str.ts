import { getTokens } from './token';
import { pad } from './pad';
import { charactersMapping, bidiCharactersMapping } from './charactersMapping';

export type Options = {
  prepend?: string;
  append?: string;
  delimiter?: string;
  startDelimiter?: string;
  endDelimiter?: string;
  extend?: number;
  extendCharacter?: string;
  override?: string;
  rightToLeft?: boolean;
};

const defaultOptions = {
  prepend: '[!!',
  append: '!!]',
  delimiter: '%',
  startDelimiter: '',
  endDelimiter: '',
  extend: 0,
  extendCharacter: ' ',
  override: undefined,
  rightToLeft: false,
};

/** Unicode character used to enforce right-to-left text rendering. */
const RLO = '\u202E';

/** Unicode character used to reset text rendering direction. */
const PDF = '\u202C';

/**
 * Transforms a single chunk of text according to the character mapping.
 *
 * The input string may contain interpolations such as `%name%`, which are
 * identified by the delimiter options. This splits the text into "chunks" of
 * either plain text or interpolations. This function transforms those chunks
 * individually.
 */
function transformChunk(
  text: string,
  override?: string,
  rightToLeft?: boolean,
): string {
  if (!text) return '';

  const mapping = rightToLeft ? bidiCharactersMapping : charactersMapping;

  let converted = '';
  text = override ? override.repeat(text.length) : text;
  for (const char of text) {
    converted += char in mapping ? mapping[char as keyof typeof mapping] : char;
  }
  return rightToLeft ? `${RLO}${converted}${PDF}` : converted;
}

export default function str(str: string, customOptions?: Options): string {
  const {
    startDelimiter,
    endDelimiter,
    delimiter,
    prepend,
    append,
    extend,
    extendCharacter,
    override,
    rightToLeft,
  } = { ...defaultOptions, ...customOptions };
  const regexTokens = getTokens(str, {
    startDelimiter,
    endDelimiter,
    delimiter,
  });

  let lastIndex = 0;
  let result = '';

  for (const token of regexTokens) {
    result += transformChunk(
      str.slice(lastIndex, token.index),
      override,
      rightToLeft,
    );
    result += token[0];
    lastIndex = token.index + token[0].length;
  }

  result += transformChunk(str.slice(lastIndex), override, rightToLeft);

  return prepend + pad(result, extend, extendCharacter) + append;
}
