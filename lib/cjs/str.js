"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var escapeRegExp_js_1 = require("./escapeRegExp.js");
var pad_js_1 = require("./pad.js");
var table_js_1 = require("./table.js");
var defaultOptions = {
    prepend: '[!!',
    append: '!!]',
    delimiter: '%',
    startDelimiter: '',
    endDelimiter: '',
    extend: 0,
    override: undefined,
};
function str(str, opts) {
    if (opts === void 0) { opts = defaultOptions; }
    var startDelimiter = escapeRegExp_js_1.escapeRegExp(opts.startDelimiter || opts.delimiter);
    var endDelimiter = escapeRegExp_js_1.escapeRegExp(opts.endDelimiter || opts.delimiter);
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
        pc = table_js_1.table[c];
        if (pc) {
            var diacriticalIndex = str.length % pc.length;
            c = pc[diacriticalIndex];
        }
        result += c;
        i++;
    }
    return opts.prepend + pad_js_1.pad(result, opts.extend) + opts.append;
}
exports.default = str;
