/**
* Option.js
*
* Pseudolocalealization options.
*
* (c) 2013 Bill, BunKat LLC.
* Pseudolocale is freely distributable under the MIT license.
* For all details and documentation:
*     http://bunkat.github.com/pseudolocale
*/
pseudolocale.option = {};

pseudolocale.reset = function() {
  pseudolocale.option = {
    prepend: '[!!',
    append: '!!]',
    delimiter: '%',
    startDelimiter: '',
    endDelimiter: '',
    extend: 0,
    override: undefined
  };
};

pseudolocale.reset();