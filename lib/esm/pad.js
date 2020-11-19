function addSpaceBefore(str) {
    return " " + str;
}
function addSpaceAfter(str) {
    return str + " ";
}
export function pad(str, percent) {
    var lengthLeft = Math.floor((str.length * percent) / 2);
    var lengthRight = lengthLeft;
    var paddedString = str;
    while (lengthLeft-- > 0) {
        paddedString = addSpaceBefore(paddedString);
    }
    while (lengthRight-- > 0) {
        paddedString = addSpaceAfter(paddedString);
    }
    return paddedString;
}
