const bodyParser        = require('body-parser');
var swaggerUi           = require('swagger-ui-express');
var swaggerDocument     = require('./swagger.json');
var cors                = require('cors');
const express           = require('express');
const path              = require('path');

const ConfigsRepository  = require('./app/repository/configs-repository');
const SettingsRepository = require('./app/repository/settings-repository');

const ConfigRouter     = require('./app/routes/config-router');
const SettingRouter    = require('./app/routes/setting-router');

module.exports = class Startup {

    constructor(){

        this.configuration = {
            sqliteOptions: {
                provider: 'sqlite',
                connectionString: {
                    host: '',
                    database: 'settings.db',
                    username: '',
                    password: ''
                }
            },
            // sqlcmd -U 'sa' -P 'yourStrong(!)Password'  -Q 'create database settings'
            mssqlOptions: {
                provider: 'mssql',
                connectionString: {
                    host: '127.0.0.1',
                    database: 'settings',
                    username: 'sa',
                    password: 'yourStrong(!)Password'
                }
            },
            postgresOptions: {
                provider: 'postgres',
                connectionString: {
                    host: 'localhost',
                    database: 'settings',
                    username: 'postgres',
                    password: 'password'
                }
            },
            mysqlOptions: {
                provider: 'mysql',
                connectionString: {
                    host: 'localhost',
                    database: 'settings',
                    username: 'root',
                    password: 'password'
                }
            }
        };

    }

    async configurationServices(services) {

        var settingsRepository = new SettingsRepository(this.configuration.sqliteOptions);

        var settings = await settingsRepository.getAllAsync();

        var baseOptions = JSON.parse(JSON.stringify(this.configuration.sqliteOptions));

        if (settings.some(x => x.key === 'provider')) {

            var provider = settings.find(x => x.key === 'provider').value;
            var host = settings.find(x => x.key === 'host').value;
            var database = settings.find(x => x.key === 'database').value;
            var username = settings.find(x => x.key === 'username').value;
            var password = settings.find(x => x.key === 'password').value;

            baseOptions = {
                provider: provider,
                connectionString: {
                    host: host,
                    database: database,
                    username: username,
                    password: password
                }
            };
        } else {
            await settingsRepository.insertAsync({ key: 'provider', value: baseOptions.provider });
            await settingsRepository.insertAsync({ key: 'host', value: baseOptions.connectionString.host });
            await settingsRepository.insertAsync({ key: 'database', value: baseOptions.connectionString.database });
            await settingsRepository.insertAsync({ key: 'username', value: baseOptions.connectionString.username });
            await settingsRepository.insertAsync({ key: 'password', value: baseOptions.connectionString.password });
        }

        services.add('SettingsRepository', settingsRepository);
        services.add('ConfigsRepository', new ConfigsRepository(baseOptions));

    }

    configure(app, services) {

        app.use(cors());

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        // static content
        app.use('/ui', express.static(path.join('./settings-service-ui/dist')))
        app.use(express.static(path.join('./settings-service-ui/dist')));

        // swagger route
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        // configs web api route
        app.use('/', (new ConfigRouter({services: services})).getRouter());

        // setting web api route
        app.use('/', (new SettingRouter({services: services})).getRouter());

        // UI route
        app.use('/ui', function(req, res) { res.sendStatus(404); });

        // root route
        //app.use('/', function(req, res) { res.sendStatus(404); });
    }

}