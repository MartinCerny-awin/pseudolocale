pseudolocale = function() {
  var pseudolocale = {
    version: "1.2.0"
  };
  pseudolocale.option = {};
  pseudolocale.reset = function() {
    pseudolocale.option = {
      prepend: "[!!",
      append: "!!]",
      delimiter: "%",
      startDelimiter: "",
      endDelimiter: "",
      extend: 0,
      override: undefined
    };
  };
  pseudolocale.reset();
  pseudolocale.table = {
    A: String.fromCharCode(192),
    a: String.fromCharCode(224),
    B: String.fromCharCode(223),
    b: String.fromCharCode(384),
    C: String.fromCharCode(262),
    c: String.fromCharCode(263),
    D: String.fromCharCode(270),
    d: String.fromCharCode(271),
    E: String.fromCharCode(274),
    e: String.fromCharCode(275),
    F: String.fromCharCode(401),
    f: String.fromCharCode(402),
    G: String.fromCharCode(284),
    g: String.fromCharCode(285),
    H: String.fromCharCode(292),
    h: String.fromCharCode(293),
    I: String.fromCharCode(296),
    i: String.fromCharCode(297),
    J: String.fromCharCode(309),
    j: String.fromCharCode(308),
    K: String.fromCharCode(310),
    k: String.fromCharCode(311),
    L: String.fromCharCode(313),
    l: String.fromCharCode(314),
    N: String.fromCharCode(323),
    n: String.fromCharCode(324),
    O: String.fromCharCode(332),
    o: String.fromCharCode(333),
    P: String.fromCharCode(420),
    p: String.fromCharCode(421),
    Q: String.fromCharCode(490),
    q: String.fromCharCode(491),
    R: String.fromCharCode(340),
    r: String.fromCharCode(341),
    S: String.fromCharCode(346),
    s: String.fromCharCode(347),
    T: String.fromCharCode(354),
    t: String.fromCharCode(355),
    U: String.fromCharCode(360),
    u: String.fromCharCode(361),
    W: String.fromCharCode(372),
    w: String.fromCharCode(373),
    Y: String.fromCharCode(374),
    y: String.fromCharCode(375),
    Z: String.fromCharCode(377),
    z: String.fromCharCode(378)
  };
  pseudolocale.escapeRegExp = function(str) {
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };
  pseudolocale.pad = function(str, percent) {
    var lenLeft = Math.floor(str.length * percent / 2), lenRight = lenLeft, pStr = str;
    while (lenLeft-- > 0) {
      pStr = " " + pStr;
    }
    while (lenRight-- > 0) {
      pStr = pStr + " ";
    }
    return pStr;
  };
  pseudolocale.str = function(str) {
    var opts = pseudolocale.option;
    var startdelim = pseudolocale.escapeRegExp(opts.startDelimiter || opts.delimiter);
    var enddelim = pseudolocale.escapeRegExp(opts.endDelimiter || opts.delimiter);
    var re = new RegExp(startdelim + ".*?" + enddelim, "g");
    var m, tokens = [], i = 0, tokenIdx = 0, result = "", c, pc;
    while (m = re.exec(str)) {
      tokens.push(m);
    }
    var token = tokens[tokenIdx++] || {
      index: -1
    };
    while (i < str.length) {
      if (token.index === i) {
        result += token[0];
        i += token[0].length;
        token = tokens[tokenIdx++] || {
          index: -1
        };
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
  return pseudolocale;
}();