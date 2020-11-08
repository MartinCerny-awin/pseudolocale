var pseudolocale = require('../index');

describe('pseudolocale.str', function () {
  afterEach(function () {
    pseudolocale.reset();
  });

  it('should exist', function () {
    expect(pseudolocale.str).toBeDefined();
  });

  it('should produce a pseudolocalized version', function () {
    expect(pseudolocale.str('test string')).toBe('[!!ţēśţ śţŕĩńĝ!!]');
  });

  it('should produce a string longer than original', function () {
    expect(pseudolocale.str('test string').length).toBeGreaterThan(11);
  });

  it('should produce consistent versions of the string each time', function () {
    var s1 = pseudolocale.str('test string'),
      s2 = pseudolocale.str('test string');

    expect(s1).toBe(s2);
  });

  it('should not pseudolocalize escaped strings', function () {
    var s1 = pseudolocale.str('test %this% string');
    expect(s1.indexOf('%this%')).not.toBe(-1);
  });

  it('should not pseudolocalize multiple escaped strings', function () {
    var s1 = pseudolocale.str('test %this% string %has% escapes.');

    expect(s1.indexOf('%this%')).not.toBe(-1);
    expect(s1.indexOf('%has%')).not.toBe(-1);
    expect(s1.indexOf('string')).toBe(-1);
  });

  it('should use the specified delimiter for escaped string', function () {
    pseudolocale.option.delimiter = '~';
    var s1 = pseudolocale.str('test ~this~ string');

    expect(s1.indexOf('~this~')).not.toBe(-1);
  });

  it('should use the RegExp special character as delimiter for escaped string', function () {
    pseudolocale.option.delimiter = '$';
    var s1 = pseudolocale.str('test $this$ string');

    expect(s1.indexOf('$this$')).not.toBe(-1);
  });

  it('should use the specified start and end delimiter for escaped string', function () {
    pseudolocale.option.startDelimiter = '{{';
    pseudolocale.option.endDelimiter = '}}';
    var s1 = pseudolocale.str('test{{this two}}string');

    expect(s1.indexOf('{{this two}}')).not.toBe(-1);
  });

  it('should support multicharacter delimiters', function () {
    pseudolocale.option.delimiter = '%%';
    var s1 = pseudolocale.str('test %%this%% string');

    expect(s1.indexOf('%%this%%')).not.toBe(-1);
  });

  it('should pad the string be the specified pad amount', function () {
    pseudolocale.option.extend = 0.2;
    var s1 = pseudolocale.str('this is a test string');

    expect(s1.length).toBe(31);
  });

  it('should support a custom start token', function () {
    pseudolocale.option.prepend = 'start';
    var s1 = pseudolocale.str('this is a test string');

    expect(s1.indexOf('start')).toBe(0);
  });

  it('should support a custom end token', function () {
    pseudolocale.option.append = 'end';
    var s1 = pseudolocale.str('this is a test string');

    expect(s1.indexOf('end')).toBe(s1.length - 3);
  });

  it('should replace with specific char specified in override', function () {
    pseudolocale.option.prepend = '';
    pseudolocale.option.append = '';
    pseudolocale.option.override = '_';

    var s1 = pseudolocale.str('this is a test string', true);
    expect(s1).toBe('_____________________');
  });

  it('should be idempotent', () => {
    expect(pseudolocale.str('test string')).toBe('[!!ţēśţ śţŕĩńĝ!!]');
  });
});
