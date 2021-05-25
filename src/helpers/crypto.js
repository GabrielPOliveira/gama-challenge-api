const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = class Encrypt {
    static async createHash(password){
        return bcrypt.hash(password, saltRounds);
    }

    static async validadePass(password, hash){
        return bcrypt.compare(password, hash);
    }
}