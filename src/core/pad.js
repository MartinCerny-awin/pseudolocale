pseudolocale.pad = function (str, percent) {

  var lenLeft = Math.floor((str.length * percent) / 2),
    lenRight = lenLeft,
    pStr = str;

  while (lenLeft-- > 0) {
    pStr = ' ' + pStr;
  }

  while (lenRight-- > 0) {
    pStr = pStr + ' ';
  }

  return pStr;
};