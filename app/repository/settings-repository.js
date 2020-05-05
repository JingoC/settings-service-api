const Sequelize = require('sequelize');
const DbProvider = require('./db-providers/db-provider')

const Model = Sequelize.Model;
class Setting extends Model {}


module.exports = class SettingsRepository extends DbProvider {

    constructor(options) {
        super(options);

        Setting.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            key: {
              type: Sequelize.STRING,
              allowNull: false
            },
            value: {
              type: Sequelize.STRING,
              allowNull: false
            }
          }, {
            sequelize: this.dbProvider.sequelize,
            modelName: 'setting'
          });


        Setting.sync({force: false});
    }

    async getAllAsync() {
        return await Setting.findAll();
    }

    async getByIdAsync(id){

        return await Setting.findOne({ where: {
            id: id
        }});
    }

    async getByKeyAsync(key) {
        return await Setting.findOne({ where: {
            key: key
        }});
    }

    async insertAsync(item) {
        return await Setting.create(item);
    }

    async updateAsync(item) {
        await Setting.update(item, {
            where: {
                id: item.id
            }
        });
    }

    async deleteAsync(id) {
        await Setting.destroy({
            where: {
                id: id
            }
        });
    }

}
