"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pad = void 0;
function addSpaceBefore(str) {
    return " " + str;
}
function addSpaceAfter(str) {
    return str + " ";
}
function pad(str, percent) {
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
exports.pad = pad;
