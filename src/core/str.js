/**
* Str.js
*
* Replaces all characters in str with pseudolocalized version according to
* pseudoloc.options.
*
* (c) 2013 Bill, BunKat LLC.
* Pseudoloc is freely distributable under the MIT license.
* For all details and documentation:
*     http://bunkat.github.com/pseudoloc
*/
pseudoloc.str = function(str) {
  var opts = pseudoloc.option
  var startdelim = pseudoloc.escapeRegExp(opts.startDelimiter || opts.delimiter)
  var enddelim = pseudoloc.escapeRegExp(opts.endDelimiter || opts.delimiter)
  var re = new RegExp(startdelim + '.*?' + enddelim, 'g')
  var m, tokens = [], i = 0, tokenIdx = 0, result = '', c, pc;

  while((m = re.exec(str))) {
    tokens.push(m);
  }

  var token = tokens[tokenIdx++] || {index: -1};
  while(i < str.length) {

    if(token.index === i) {
      result += token[0];
      i += token[0].length;
      token = tokens[tokenIdx++] || {index: -1};
      continue;
    }

    c = opts.override !== undefined ? opts.override : str[i];
    pc = pseudoloc.table[c];
    if (pc) {
      var diacriticalIndex = str.length % pc.length;
      c = pc[diacriticalIndex];
    }
    result += c;
    i++;
  }

  return opts.prepend + pseudoloc.pad(result, opts.extend) + opts.append;
};