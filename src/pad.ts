/**
 * Extends the width of the string by the specified percentage.
 * The character used for padding can be customized (defaults to a space).
 */
export function pad(str: string, percent: number, character = ' '): string {
  let lengthLeft = Math.floor((str.length * percent) / 2);
  let lengthRight = lengthLeft;
  let paddedString = str;

  while (lengthLeft-- > 0) {
    paddedString = `${character}${paddedString}`;
  }

  while (lengthRight-- > 0) {
    paddedString = `${paddedString}${character}`;
  }

  return paddedString;
}
