function escapeRegExp(str: string): string {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

interface Delimiters {
  startDelimiter: string;
  endDelimiter: string;
  delimiter: string;
  rightToLeft?: boolean;
}

function getDelimiterRegExp({
  startDelimiter,
  endDelimiter,
  delimiter,
  rightToLeft,
}: Delimiters): RegExp {
  const startEscapedDelimiter = escapeRegExp(startDelimiter || delimiter);
  const endEscapedDelimiter = escapeRegExp(endDelimiter || delimiter);

  const delimittedPattern = `${startEscapedDelimiter}.*?${endEscapedDelimiter}`;
  const pattern = rightToLeft ? `${delimittedPattern}|\\d+` : delimittedPattern;

  return new RegExp(pattern, 'g');
}

/**
 * Returns tokens as RegExp array
 */
export function getTokens(
  str: string,
  delimiters: Delimiters,
): RegExpExecArray[] {
  const delimiterRegExp = getDelimiterRegExp(delimiters);

  let regexResult;
  const regexResults = [];
  while ((regexResult = delimiterRegExp.exec(str))) {
    regexResults.push(regexResult);
  }
  return regexResults;
}
