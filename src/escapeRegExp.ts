export function escapeRegExp(str: string) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
