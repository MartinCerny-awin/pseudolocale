pseudolocale.str = function(str) {
  var opts = pseudolocale.option
  var startdelim = pseudolocale.escapeRegExp(opts.startDelimiter || opts.delimiter)
  var enddelim = pseudolocale.escapeRegExp(opts.endDelimiter || opts.delimiter)
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
    pc = pseudolocale.table[c];
    if (pc) {
      var diacriticalIndex = str.length % pc.length;
      c = pc[diacriticalIndex];
    }
    result += c;
    i++;
  }

  return opts.prepend + pseudolocale.pad(result, opts.extend) + opts.append;
};