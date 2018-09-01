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