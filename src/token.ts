function escapeRegExp(str: string): string {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

interface Delimiters {
  startDelimiter: string;
  endDelimiter: string;
  delimiter: string;
}

function getDelimiterRegExp({
  startDelimiter,
  endDelimiter,
  delimiter,
}: Delimiters): RegExp {
  const startEscapedDelimiter = escapeRegExp(startDelimiter || delimiter);
  const endEscapedDelimiter = escapeRegExp(endDelimiter || delimiter);

  return new RegExp(`${startEscapedDelimiter}.*?${endEscapedDelimiter}`, 'g');
}

/**
 * Returns tokens as RegExp array
 */
export function getTokens(
  str: string,
  { startDelimiter, endDelimiter, delimiter }: Delimiters,
): RegExpExecArray[] {
  const delimiterRegExp = getDelimiterRegExp({
    startDelimiter,
    endDelimiter,
    delimiter,
  });

  let regexResult;
  const regexResults = [];
  while ((regexResult = delimiterRegExp.exec(str))) {
    regexResults.push(regexResult);
  }
  return regexResults;
}
