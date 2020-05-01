const SqliteBaseRepository = require('./sqlite-base-repository')

module.exports = class ConfigsRepository extends SqliteBaseRepository {

    async getByApplicationAndEnvironmentAsync(application, environment){

        var result = [];

        var sql = `select * from [Configs] where Application = '${application}' and Environment = '${environment}'`;

        await this._DbContext.all(sql, (err, rows) => {
            result = rows;
        })

        return result;
    }

}
