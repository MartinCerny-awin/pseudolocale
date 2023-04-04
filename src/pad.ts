/**
 * Extends the width of the string by the specified percentage.
 */
export function pad(str: string, percent: number): string {
  let lengthLeft = Math.floor((str.length * percent) / 2);
  let lengthRight = lengthLeft;
  let paddedString = str;

  while (lengthLeft-- > 0) {
    paddedString = ` ${paddedString}`;
  }

  while (lengthRight-- > 0) {
    paddedString = `${paddedString} `;
  }

  return paddedString;
}
