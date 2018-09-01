# Pseudolocale

_Pseudolocale_ is a small library for quickly pseudolocalizing strings. [Pseudolocalization](http://en.wikipedia.org/wiki/Pseudolocalealization) is a method for testing the internationalization aspects of your application by replacing your strings with altered versions that maintains string readability while including the most problematic characteristics including text length and character length. It also makes hard coded strings and improperly concatenated strings easy to spot so that they can be properly localized.

## Using with Node.js

    var pseudolocale = require('pseudolocale');

    pseudolocale.str('A test string with a %token%.')
    // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.!!]

## Using in a browser

    <script src="../pseudolocale.js" type="text/javascript"></script>
    <script type="text/javascript">

      pseudolocale.str('A test string with a %token%.')
      // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.!!]

    </script>

## Using from the command line

_Pseudolocale_ includes a command line interface to make it easy to incorporate it into your build process. Currently it supports passing in individual strings (great for trying things out) or passing in a valid `JSON` document that contains a set of keys and strings. Each of the strings in the file will then be pseudolocalized.

Note: Nodejs must be installed to use the command line interface.

    ./bin/pseudolocale --string 'A test string with a %token%.'
    // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.!!]


    // example.json
    {
      "string1": "this is the first string",
      "string2": "a string with a %token%",
      "string3": "a string with a %couple% of %tokens%"
    }

    ./bin/pseudolocale --readFile example.json --writeFile example-pseudo.json

    // example-pseudo.json
    {
      "string1": "[!!ţĥĩş ĭś ťĥě ƒĩŗśŧ şţřįƞĝ!!]",
      "string2": "[!!ȁ ŝťŗĩňğ ŵįťĥ ã %token%!!]",
      "string3": "[!!ȃ şťřīňğ ŵĩťħ ä %couple% ŏƒ %tokens%!!]"
    }

The command line tool uses the same options as the library. For additional help and more examples:

    ./bin/pseudolocale --help

## Options

#### Prepend

Specifies the string that should be prepended to the beginning of pseudolocalized strings. The prepended and appended strings help to locate strings that have been cut off or improperly concatenated together - localized strings should use tokens for data since different languages have different word orders.

Default is `[!!`.

    pseudolocale.option.prepend = '[##';
    pseudolocale.str('A test string with a %token%.')
    // [##Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.!!]

#### Append

Specifies the string that should be appended to the end of pseudolocalized strings. The prepended and appended strings help to locate strings that have been cut off or improperly concatenated together - localized strings should use tokens for data since different languages have different word orders.

Default is `!!]`.

    pseudolocale.option.append = '##]';
    pseudolocale.str('A test string with a %token%.')
    // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.##]

#### Delimiter, StartDelimiter, EndDelimiter

Specifies the token delimiter. Any characters between token delimiters will not be pseudolocalized. Tokens are used to replace data within localized strings. You can either specify a single delimiter or use startDelimiter and endDelimiter to specify the delimiters seperately.

Default is `%`.

    pseudolocale.option.delimiter = '$$';
    pseudolocale.str('A test string with a $$token$$.')
    // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą $$token$$.!!]

    pseudolocale.option.startDelimiter = '{{';
    pseudolocale.option.endDelimiter = '}}';
    pseudolocale.str('A test string with a {{token}}.')
    // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą {{token}}.!!]

#### Extend

Extends the width of the string by the specified percentage. Useful if you will be localizing into languages such as German which can be 30% longer than English.

Default is `0`.

    pseudolocale.option.extend = 0.3; //30%
    pseudolocale.str('A test string with a %token%.')
    // [!!Ȃ ťēšť ŝťŕĩŉğ ŵĩťħ â %token%.        !!]


#### Override

Specifies an override character that all characters in the string will be replaced with. Used to easily spot unlocalized strings. Set to `undefined` to go back to regular pseudolocalealization.

Default is `undefined`.

    pseudolocale.option.override = '_';
    pseudolocale.str('A test string with a %token%.')
    // [!!_____________________%token%_!!]

## Installation
Using npm:

    $ npm install pseudolocale

## Building

To build the minified javascript files for _pseudolocale_, run `npm install` to install dependencies and then:

    $ make build

## Running tests

To run the tests for _pseudolocale_, run `npm install` to install dependencies and then:

    $ make test

## Running benchmarks

To run the benchmarks for _pseudolocale_, run `npm install` to install dependencies and then:

    $ make benchmark
