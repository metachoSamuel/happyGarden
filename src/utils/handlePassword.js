const bcrypt = require('bcrypt');

const encrypt = async (passwordPlain) => await bcrypt.hash(passwordPlain, 10);
const compare = async (passwordPlain, hashPassword) => await bcrypt.compare(passwordPlain, hashPassword);

module.exports = {
    encrypt,
    compare
}