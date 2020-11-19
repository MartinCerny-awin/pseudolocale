function addSpaceBefore(str: string): string {
  return ` ${str}`;
}

function addSpaceAfter(str: string): string {
  return `${str} `;
}

export function pad(str: string, percent: number): string {
  let lengthLeft = Math.floor((str.length * percent) / 2);
  let lengthRight = lengthLeft;
  let paddedString = str;

  while (lengthLeft-- > 0) {
    paddedString = addSpaceBefore(paddedString);
  }

  while (lengthRight-- > 0) {
    paddedString = addSpaceAfter(paddedString);
  }

  return paddedString;
}
