var pseudolocale = require('../index'),
    should = require('should');

describe('pseudolocale.str', function() {

  afterEach(function() {
    pseudolocale.reset();
  });

  it('should exist', function() {
    should.exist(pseudolocale.str);
  });

  it('should produce a pseudolocalized version', function() {
    pseudolocale.str('test string').should.not.eql('test string');
  });

  it('should produce a string longer than original', function() {
    pseudolocale.str('test string').length.should.be.above(11);
  });

  it('should produce consistent versions of the string each time', function() {
    var s1 = pseudolocale.str('test string'),
        s2 = pseudolocale.str('test string');

    s1.should.eql(s2);
  });

  it('should not pseudolocalealize escaped strings', function() {
    var s1 = pseudolocale.str('test %this% string');
    s1.indexOf('%this%').should.not.eql(-1);
  });

  it('should not pseudolocalealize multiple escaped strings', function() {
    var s1 = pseudolocale.str('test %this% string %has% escapes.');

    s1.indexOf('%this%').should.not.eql(-1);
    s1.indexOf('%has%').should.not.eql(-1);
    s1.indexOf('string').should.eql(-1);
  });

  it('should use the specified delimiter for escaped string', function() {
    pseudolocale.option.delimiter = '~';
    var s1 = pseudolocale.str('test ~this~ string');

    s1.indexOf('~this~').should.not.eql(-1);
  });

  it('should use the RegExp special character as delimiter for escaped string', function() {
    pseudolocale.option.delimiter = '$';
    var s1 = pseudolocale.str('test $this$ string');

    s1.indexOf('$this$').should.not.eql(-1);
  });

  it('should use the specified start and end delimiter for escaped string', function() {
    pseudolocale.option.startDelimiter = '{{';
    pseudolocale.option.endDelimiter = '}}';
    var s1 = pseudolocale.str('test{{this two}}string');

    s1.indexOf('{{this two}}').should.not.eql(-1);
  });

  it('should support multicharacter delimiters', function() {
    pseudolocale.option.delimiter = '%%';
    var s1 = pseudolocale.str('test %%this%% string');

    s1.indexOf('%%this%%').should.not.eql(-1);
  });

  it('should pad the string be the specified pad amount', function() {
    pseudolocale.option.extend = 0.2;
    var s1 = pseudolocale.str('this is a test string');

    s1.length.should.eql(31);
  });

  it('should support a custom start token', function() {
    pseudolocale.option.prepend = 'start';
    var s1 = pseudolocale.str('this is a test string');

    s1.indexOf('start').should.eql(0);
  });

  it('should support a custom end token', function() {
    pseudolocale.option.append = 'end';
    var s1 = pseudolocale.str('this is a test string');

    s1.indexOf('end').should.eql(s1.length-3);
  });

  it('should replace with specific char specified in override', function() {
    pseudolocale.option.prepend = '';
    pseudolocale.option.append = '';
    pseudolocale.option.override = '_';

    var s1 = pseudolocale.str('this is a test string', true);
    s1.should.eql('_____________________');
  });

  it('should be idempotent', () => {
    pseudolocale.str('test string').should.eql('[!!ţēśţ śţŕĩńĝ!!]');
  })
  

});