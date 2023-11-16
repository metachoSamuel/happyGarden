const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = './models';

const models = {
    usersModel: require('./user'),
    gardensModel: require('./garden'),
}


module.exports = models