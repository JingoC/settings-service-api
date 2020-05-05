const Sequelize = require('sequelize');
const SqliteDbProvider = require('./sqlite-db-provider');
const MsSqlDbProvider = require('./mssql-db-provider');
const MySqlDbProvider = require('./mysql-db-provider');
const PostgresDbProvider = require('./postgres-db-provider');

module.exports = class DbProvider {

    constructor(options) {

        switch(options.provider) {
            case 'sqlite': this.dbProvider = new SqliteDbProvider(options); break;
            case 'mssql': this.dbProvider = new MsSqlDbProvider(options); break;
            case 'mysql': this.dbProvider = new MySqlDbProvider(options); break;
            case 'postgres': this.dbProvider = new PostgresDbProvider(options); break;
            default: {
                throw `db provider not supported ${options.provider}`;
            }break;
        }
    }

    checkConnection() {
        var result = true;
        this.dbProvider.sequelize.authenticate()
            .then(() => {})
            .catch(err => {
                result = false;
            });
        return result;
    }

    close() {
        this.dbProvider.sequelize.close();
    }
}
