import { escapeRegExp } from './escapeRegExp.js';
import { pad } from './pad.js';
import { table } from './table.js';
var defaultOptions = {
    prepend: '[!!',
    append: '!!]',
    delimiter: '%',
    startDelimiter: '',
    endDelimiter: '',
    extend: 0,
    override: undefined,
};
export default function str(str, opts) {
    if (opts === void 0) { opts = defaultOptions; }
    var startDelimiter = escapeRegExp(opts.startDelimiter || opts.delimiter);
    var endDelimiter = escapeRegExp(opts.endDelimiter || opts.delimiter);
    var re = new RegExp(startDelimiter + ".*?" + endDelimiter, 'g');
    var m;
    var tokens = [];
    var i = 0;
    var tokenIdx = 0;
    var result = '';
    var c;
    var pc;
    while ((m = re.exec(str))) {
        tokens.push(m);
    }
    var token = tokens[tokenIdx++] || { index: -1 };
    while (i < str.length) {
        if (token.index === i) {
            result += token[0];
            i += token[0].length;
            token = tokens[tokenIdx++] || { index: -1 };
            continue;
        }
        c = opts.override !== undefined ? opts.override : str[i];
        pc = table[c];
        if (pc) {
            var diacriticalIndex = str.length % pc.length;
            c = pc[diacriticalIndex];
        }
        result += c;
        i++;
    }
    return opts.prepend + pad(result, opts.extend) + opts.append;
}
