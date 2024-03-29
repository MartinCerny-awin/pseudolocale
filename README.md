# Pseudolocale

[![npm](https://img.shields.io/npm/v/pseudolocale?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/pseudolocale)
![NPM downloads](https://img.shields.io/npm/dm/pseudolocale.svg?link=https://www.npmjs.com/package/pseudolocale&link=https://www.npmjs.com/package/pseudolocale)
[![CI](https://github.com/MartinCerny-awin/pseudolocale/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/MartinCerny-awin/pseudolocale/actions/workflows/ci.yml)
[![GitHub contributors](https://img.shields.io/github/contributors/MartinCerny-awin/pseudolocale?cacheSeconds=1000)](https://github.com/MartinCerny-awin/pseudolocale/graphs/contributors)
[![npm](https://img.shields.io/codecov/c/github/MartinCerny-awin/pseudolocale/main.svg)](https://codecov.io/gh/MartinCerny-awin/pseudolocale)

_Pseudolocale_ is a small library for quickly pseudolocalizing strings. [Pseudolocalization](http://en.wikipedia.org/wiki/Pseudolocalealization) is a method for testing the internationalization aspects of your application by replacing your strings with altered versions that maintains string readability while including the most problematic characteristics including text length and character length. It also makes hard coded strings and improperly concatenated strings easy to spot so that they can be properly localized. This library is idempotent eg. it always creates the same string.

## Installation

```bash
npm install pseudolocale
# or
yarn add pseudolocale
```

## Using with Node.js

```js
const pseudolocale = require('pseudolocale');

// or using ESM
import pseudolocale from 'pseudolocale';

pseudolocale('This is going to be pseudolocalized %token%.');
// [!!Ţĥĩś ĩś ĝōĩńĝ ţō ƀē ƥśēũďōĺōćàĺĩźēď %token%.!!]
```

## Using from the command line

_Pseudolocale_ includes a command line interface to make it easy to incorporate it into your build process. Currently it supports passing in individual strings (great for trying things out) or passing in a valid `JSON` document that contains a set of keys and strings. Each of the strings in the file will then be pseudolocalized.

Note: Nodejs must be installed to use the command line interface.

```bash
pseudolocale --string 'This is going to be pseudolocalized %token%.'
# [!!Ţĥĩś ĩś ĝōĩńĝ ţō ƀē ƥśēũďōĺōćàĺĩźēď %token%.!!]
```

example.json
```json
{
  "string1": "this is the first string",
  "string2": "a string with a %token%",
  "string3": "a string with a %couple% of %tokens%"
}
```

```bash
pseudolocale --readFile example.json --writeFile example-pseudo.json
```

example-pseudo.json
```json
{
  "string1": "[!!ţĥĩş ĭś ťĥě ƒĩŗśŧ şţřįƞĝ!!]",
  "string2": "[!!ȁ ŝťŗĩňğ ŵįťĥ ã %token%!!]",
  "string3": "[!!ȃ şťřīňğ ŵĩťħ ä %couple% ŏƒ %tokens%!!]"
}
```

The command line tool uses the same options as the library. For additional help and more examples:

```bash
pseudolocale --help
```

## Options

### Prepend

Specifies the string that should be prepended to the beginning of pseudolocalized strings. The prepended and appended strings help to locate strings that have been cut off or improperly concatenated together - localized strings should use tokens for data since different languages have different word orders.

Default is `[!!`.

```js
pseudolocale('This is going to be pseudolocalized %token%.', {
  prepend: '[##',
});
// [##Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.!!]
```

### Append

Specifies the string that should be appended to the end of pseudolocalized strings. The prepended and appended strings help to locate strings that have been cut off or improperly concatenated together - localized strings should use tokens for data since different languages have different word orders.

Default is `!!]`.

```js
pseudolocale('This is going to be pseudolocalized %token%.', { append: '##]' });
// [!!Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.##]
```

### Delimiter, StartDelimiter, EndDelimiter

Specifies the token delimiter. Any characters between token delimiters will not be pseudolocalized. Tokens are used to replace data within localized strings. You can either specify a single delimiter or use startDelimiter and endDelimiter to specify the delimiters seperately.

Default is `%`.

```js
pseudolocale('A test string with a $$token$$.', { delimiter: '$$' });
// [!!Á ţȇšŧ śťřīņğ ŵıţħ ą $$token$$.!!]

pseudolocale('A test string with a {{token}}.', {
  startDelimiter: '{{',
  endDelimiter: '}}',
});
// [!!Á ţȇšŧ śťřīņğ ŵıţħ ą {{token}}.!!]
```

### Extend

Extends the width of the string by the specified percentage. Useful if you will be localizing into languages such as German which can be 30% longer than English.

Default is `0`.

```js
pseudolocale('This is going to be pseudolocalized %token%.', { extend: 0.3 }); // 30%
// [!!Ȃ ťēšť ŝťŕĩŉğ ŵĩťħ â %token%.        !!]
```

### Override

Specifies an override character that all characters in the string will be replaced with. Used to easily spot unlocalized strings. Set to `undefined` to go back to regular pseudolocalealization.

Default is `undefined`.

```js
pseudolocale('This is going to be pseudolocalized %token%.', { override: '_' });
// [!!_____________________%token%_!!]
```

## Contribution

### Installation

Using npm:

```bash
npm i
```

### Building

To build javascript files for _pseudolocale_, run `npm i` to install dependencies and then:

```bash
npm run build
```

### Running tests

To run the tests for _pseudolocale_, run `npm i` to install dependencies and then:

```bash
npm test
```

## Release new version

1. change version in package.json

2. Publish to npm
```bash
npm login
npm publish
```

3. Push `package.json` & `package-lock.json` to origin.
4. Go to GitHub releases https://github.com/MartinCerny-awin/pseudolocale/releases and create new release

