pseudoloc.escapeRegExp = function (str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};