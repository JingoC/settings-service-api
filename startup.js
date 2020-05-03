const bodyParser        = require('body-parser');
var swaggerUi           = require('swagger-ui-express');
var swaggerDocument     = require('./swagger.json');

const ConfigsRepository = require('./app/repository/sqlite/configs-repository');

const ConfigRouter     = require('./app/routes/config-router');

module.exports = class Startup {

    constructor(){

        this.configuration = {
            SettingsDbConnectionString: 'settings.db'
        };

    }

    configurationServices(services) {
        services.add('ConfigsRepository', new ConfigsRepository({connectionString: this.configuration.SettingsDbConnectionString}));
    }

    configure(app, services) {

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        // swagger route
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        // configs web api route
        app.use('/configs', (new ConfigRouter({services: services})).getRouter());

        // UI route
        app.use('/ui', function(req, res) { res.sendStatus(404); });

        // root route
        app.use('/', function(req, res) { res.sendStatus(404); });
    }

}