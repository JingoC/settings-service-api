const sqlite3 = require('sqlite3').verbose();

module.exports = class SqliteBaseRepository {

    constructor(options){

        this._DbContext = new sqlite3.Database(options.connectionString,
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            (err) => {
                if (err) {
                    console.error(err.message);
                }
            console.log('Connected to the database.');
        });
    }

    close() {
        this._DbContext.close();
    }
}
