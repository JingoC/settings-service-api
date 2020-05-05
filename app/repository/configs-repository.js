const Sequelize = require('sequelize');
const DbProvider = require('./db-providers/db-provider')

const Model = Sequelize.Model;
class Config extends Model {}


module.exports = class ConfigsRepository extends DbProvider {

    constructor(options) {
        super(options);

        Config.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            application: {
              type: Sequelize.STRING,
              allowNull: false
            },
            environment: {
              type: Sequelize.STRING,
              allowNull: false
            },
            json: {
              type: Sequelize.STRING,
              allowNull: false
            }
          }, {
            sequelize: this.dbProvider.sequelize,
            modelName: 'config'
          });


        Config.sync({force: false});
    }

    async getAllAsync() {
        return await Config.findAll();
    }

    async getByApplicationAsync(application) {
        return await Config.findAll({
            where: {
                application: application
            }
        });
    }

    async getByApplicationAndEnvironmentAsync(application, environment){

        return await Config.findOne({ where: {
            application: application,
            environment: environment
        }});
    }

    async getByIdAsync(id){

        return await Config.findOne({ where: {
            id: id
        }});
    }

    async insertAsync(item) {
        return await Config.create(item);
    }

    async updateAsync(item) {
        await Config.update(item, {
            where: {
                id: item.id
            }
        });
    }

    async deleteAsync(id) {
        await Config.destroy({
            where: {
                id: id
            }
        });
    }

}
