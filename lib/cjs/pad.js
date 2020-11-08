"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pad = void 0;
function pad(str, percent) {
    var lenLeft = Math.floor((str.length * percent) / 2), lenRight = lenLeft, pStr = str;
    while (lenLeft-- > 0) {
        pStr = ' ' + pStr;
    }
    while (lenRight-- > 0) {
        pStr = pStr + ' ';
    }
    return pStr;
}
exports.pad = pad;
;
