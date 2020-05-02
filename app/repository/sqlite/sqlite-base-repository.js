const Sequelize = require('sequelize');


module.exports = class SqliteBaseRepository {

    constructor(options){

        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: options.connectionString,
            max: 5,
            min: 0
        });
    }

    checkConnection() {
        var result = true;
        this.sequelize.authenticate()
            .then(() => {})
            .catch(err => {
                result = false;
            });
        return result;
    }

    close() {
        this.sequelize.close();
    }
}
