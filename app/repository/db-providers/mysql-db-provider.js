const Sequelize = require('sequelize');


module.exports = class MySqlDbProvider {

    constructor(options){

        this.sequelize = new Sequelize(
            options.connectionString.database,
            options.connectionString.username,
            options.connectionString.password,
        {
            host: options.connectionString.host,
            dialect: 'mysql',
            max: 5,
            min: 0
        });
    }
}
