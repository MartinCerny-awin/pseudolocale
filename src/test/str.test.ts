import { describe, it, expect } from 'vitest';
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

  it('should pad the string be the specified pad amount (with whitespace as default)', () => {
    const options = { extend: 0.2 };
    const s1 = pseudolocale('this is a test string', options);

    expect(s1.length).toBe(31);
    expect(s1.indexOf('~')).toBe(-1);
  });

  it('should pad with a custom character when extendCharacter is set', () => {
    const options = { extend: 0.2, extendCharacter: '~' };
    const s1 = pseudolocale('this is a test string', options);

    expect(s1.length).toBe(31);
    expect(s1.startsWith('[!!~~')).toBe(true);
    expect(s1.endsWith('~~!!]')).toBe(true);
  });

  it('should hit the target percentage with a multi-character extendCharacter', () => {
    const options = { extend: 0.2, extendCharacter: '~~' };
    const s1 = pseudolocale('this is a test string', options);

    expect(s1.length).toBe(31);
    expect(s1.startsWith('[!!~~')).toBe(true);
    expect(s1.endsWith('~~!!]')).toBe(true);
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

  describe('rightToLeft (RTL / bidi)', () => {
    it('should produce an RTL pseudolocalized string wrapped with RLO and PDF', () => {
      expect(pseudolocale('my test string', { rightToLeft: true })).toBe(
        '[!!\u202Eɯʎ ʇǝsʇ sʇɹıuƃ\u202C!!]',
      );
    });

    it('should isolate tokens outside RLO and PDF spans', () => {
      expect(
        pseudolocale('my name is %token% today', { rightToLeft: true }),
      ).toBe('[!!\u202Eɯʎ uɐɯǝ ıs \u202C%token%\u202E ʇopɐʎ\u202C!!]');
    });

    it('should handle start and end delimiters in RTL mode', () => {
      expect(
        pseudolocale('my name is {name}', {
          rightToLeft: true,
          startDelimiter: '{',
          endDelimiter: '}',
        }),
      ).toBe('[!!\u202Eɯʎ uɐɯǝ ıs \u202C{name}!!]');
    });

    it('should handle token at the beginning of the string', () => {
      expect(
        pseudolocale('{name} is here', {
          rightToLeft: true,
          startDelimiter: '{',
          endDelimiter: '}',
        }),
      ).toBe('[!!{name}\u202E ıs ɥǝɹǝ\u202C!!]');
    });

    it('should support custom prepend and append in RTL mode', () => {
      expect(
        pseudolocale('test', {
          rightToLeft: true,
          prepend: '[@@',
          append: '@@]',
        }),
      ).toBe('[@@\u202Eʇǝsʇ\u202C@@]');
    });

    it('should support extend padding in RTL mode', () => {
      const result = pseudolocale('test', {
        rightToLeft: true,
        extend: 0.5,
        extendCharacter: '~',
      });
      expect(result).toBe('[!!~\u202Eʇǝsʇ\u202C~!!]');
    });

    it('should support override in RTL mode', () => {
      expect(
        pseudolocale('test', {
          rightToLeft: true,
          override: '_',
        }),
      ).toBe('[!!\u202E____\u202C!!]');
    });

    it('should not flip numbers in RTL mode', () => {
      expect(
        pseudolocale('Welcome123 to 456 the 780jungle', { rightToLeft: true }),
      ).toBe(
        '[!!\u202EMǝʅɔoɯǝ\u202C123\u202E ʇo \u202C456\u202E ʇɥǝ \u202C780\u202Eɾnuƃʅǝ\u202C!!]',
      );
    });

    it('should handle numbers at start, end, and around tokens in RTL mode', () => {
      expect(pseudolocale('123 test 456', { rightToLeft: true })).toBe(
        '[!!123\u202E ʇǝsʇ \u202C456!!]',
      );
    });

    it('should not modify delimited strings containing numbers in RTL mode', () => {
      expect(
        pseudolocale('user %user123% has 456 points', { rightToLeft: true }),
      ).toBe(
        '[!!\u202Ensǝɹ \u202C%user123%\u202E ɥɐs \u202C456\u202E doıuʇs\u202C!!]',
      );
    });
  });
});
