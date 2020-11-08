import { escapeRegExp } from "./escapeRegExp.js";
import { pad } from "./pad.js";
import { table } from "./table.js";

interface Options {
  prepend: string;
  append: string;
  delimiter: string;
  startDelimiter: string;
  endDelimiter: string;
  extend: number;
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
}

type Letter = 
  "A" | 
  "a" | 
  "B" | 
  "b" | 
  "C" | 
  "c" | 
  "D" | 
  "d" | 
  "E" | 
  "e" | 
  "F" | 
  "f" | 
  "G" | 
  "g" | 
  "H" | 
  "h" | 
  "I" | 
  "i" | 
  "J" | 
  "j" | 
  "K" | 
  "k" | 
  "L" | 
  "l" | 
  "N" | 
  "n" | 
  "O" | 
  "o" | 
  "P" | 
  "p" | 
  "Q" | 
  "q" | 
  "R" | 
  "r" | 
  "S" | 
  "s" | 
  "T" | 
  "t" | 
  "U" | 
  "u" | 
  "W" | 
  "w" | 
  "Y" | 
  "y" | 
  "Z" | 
  "z";


export default function str(str: string, opts: Options = defaultOptions): string {
  var startdelim = escapeRegExp(opts.startDelimiter || opts.delimiter);
  var enddelim = escapeRegExp(opts.endDelimiter || opts.delimiter);
  var re = new RegExp(startdelim + '.*?' + enddelim, 'g');
  var m,
    tokens = [],
    i = 0,
    tokenIdx = 0,
    result = '',
    c,
    pc;

  while ((m = re.exec(str))) {
    tokens.push(m);
  }

  var token = tokens[tokenIdx++] || { index: - 1};
  while (i < str.length) {
    if (token.index === i) {
      result += token[0];
      i += token[0].length;
      token = tokens[tokenIdx++] || { index: - 1};
      continue;
    }

    c = opts.override !== undefined ? opts.override : str[i];
    pc = table[c as Letter];
    if (pc) {
      var diacriticalIndex = str.length % pc.length;
      c = pc[diacriticalIndex];
    }
    result += c;
    i++;
  }

  return opts.prepend + pad(result, opts.extend) + opts.append;
};
