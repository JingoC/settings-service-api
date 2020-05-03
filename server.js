const http           = require('http');
const express        = require('express');
const DIContainer    = require('./dic/dic');
const Startup        = require('./startup');

const appExpress = express();
const services = new DIContainer();
const startup = new Startup();

class Program {

    Main() {

        // config application
        startup.configurationServices(services);
        startup.configure(appExpress, services);

        // Start server

        const server = http.createServer(appExpress);



        const port = 8000;
        server.listen(port, async () => {
            console.log(`start server on port: http://localhost:${port}`);
        });
    }
}

const program = new Program();
program.Main();

