import pseudolocale from '../index';

describe('pseudolocale', () => {
  it('should exist', () => {
    expect(pseudolocale).toBeDefined();
  });

  it('should produce a pseudolocalized version', () => {
    expect(pseudolocale('my test string')).toBe('[!!ḿŷ ţēśţ śţŕĩńĝ!!]');
  });

  it('should produce a string longer than original', () => {
    expect(pseudolocale('test string').length).toBeGreaterThan(11);
  });

  it('should produce consistent versions of the string each time', () => {
    const s1 = pseudolocale('test string');
    const s2 = pseudolocale('test string');

    expect(s1).toBe(s2);
  });

  it('should not pseudolocalize escaped strings', () => {
    const s1 = pseudolocale('test %this% string');
    expect(s1.indexOf('%this%')).not.toBe(-1);
  });

  it('should not pseudolocalize multiple escaped strings', () => {
    const s1 = pseudolocale('test %this% string %has% escapes.');

    expect(s1.indexOf('%this%')).not.toBe(-1);
    expect(s1.indexOf('%has%')).not.toBe(-1);
    expect(s1.indexOf('string')).toBe(-1);
  });

  it('should use the specified delimiter for escaped string', () => {
    const options = { delimiter: '~' };
    const s1 = pseudolocale('test ~this~ string', options);

    expect(s1.indexOf('~this~')).not.toBe(-1);
  });

  it('should use the RegExp special character as delimiter for escaped string', () => {
    const options = { delimiter: '$' };
    const s1 = pseudolocale('test $this$ string', options);

    expect(s1.indexOf('$this$')).not.toBe(-1);
  });

  it('should use the specified start and end delimiter for escaped string', () => {
    const options = { startDelimiter: '{{', endDelimiter: '}}' };
    const s1 = pseudolocale('test{{this two}}string', options);

    expect(s1.indexOf('{{this two}}')).not.toBe(-1);
  });

  it('should support multi character delimiters', () => {
    const options = { delimiter: '%%' };
    const s1 = pseudolocale('test %%this%% string', options);

    expect(s1.indexOf('%%this%%')).not.toBe(-1);
  });

  it('should pad the string be the specified pad amount', () => {
    const options = { extend: 0.2 };
    const s1 = pseudolocale('this is a test string', options);

    expect(s1.length).toBe(31);
  });

  it('should support a custom start token', () => {
    const options = { prepend: 'start' };
    const s1 = pseudolocale('this is a test string', options);

    expect(s1.indexOf('start')).toBe(0);
  });

  it('should support a custom end token', () => {
    const options = { append: 'end' };
    const s1 = pseudolocale('this is a test string', options);

    expect(s1.indexOf('end')).toBe(s1.length - 3);
  });

  it('should replace with specific char specified in override', () => {
    const options = { prepend: '', append: '', override: '_' };
    const s1 = pseudolocale('this is a test string', options);
    expect(s1).toBe('_____________________');
  });

  it('should be idempotent', () => {
    expect(pseudolocale('test string')).toBe('[!!ţēśţ śţŕĩńĝ!!]');
  });
});
