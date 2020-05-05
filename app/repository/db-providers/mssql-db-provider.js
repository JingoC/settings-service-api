const Sequelize = require('sequelize');


module.exports = class MsSqlDbProvider {

    constructor(options){

        this.sequelize = new Sequelize(
            options.connectionString.database,
            options.connectionString.username,
            options.connectionString.password,
        {
            host: options.connectionString.host,
            dialect: 'mssql',
            max: 5,
            min: 0
        });
    }
}
