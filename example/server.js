var pseudolocale = require('../index'), // require('pseudolocale') if installed with npm
    str = 'Thank you for using %pseudolocale.js%.';

console.log('Before: ', str);
console.log('After : ', pseudolocale.str(str));