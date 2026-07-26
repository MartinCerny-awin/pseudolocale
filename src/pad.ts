/**
 * Extends the width of the string by the specified percentage.
 * The character used for padding can be customized (defaults to a space).
 * Multi-character strings are repeated/truncated so the target percentage
 * length is still hit exactly.
 */
export function pad(str: string, percent: number, character = ' '): string {
  const lengthLeft = Math.floor((str.length * percent) / 2);
  const lengthRight = lengthLeft;

  if (!character.length) return str;

  const padSide = (length: number) =>
    character.repeat(Math.ceil(length / character.length)).slice(0, length);

  return `${padSide(lengthLeft)}${str}${padSide(lengthRight)}`;
}
