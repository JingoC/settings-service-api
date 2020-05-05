const Sequelize = require('sequelize');


module.exports = class PostgresDbProvider {

    constructor(options){

        this.sequelize = new Sequelize(
            options.connectionString.database,
            options.connectionString.username,
            options.connectionString.password,
        {
            host: options.connectionString.host,
            dialect: 'postgres',
            max: 5,
            min: 0
        });
    }
}
