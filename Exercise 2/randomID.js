
const crypto = require('crypto');
const array = new Uint32Array(1);
const ID = crypto.getRandomValues(array)

console.log(`Your random id is: ${ID[0]}`)
