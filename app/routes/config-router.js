const BaseRouter = require('./base-router');

module.exports = class ConfigRouter extends BaseRouter {

  constructor(options) {

    super(options);

    this.configsRepository = this._services.get('ConfigsRepository');

    this._router.get('/:application/:environment', (req, res) => this.getByApplicationAndEnvironmentAsync(req, res));
    this._router.get('/', (req, res) => this.getAll(req, res));
    this._router.post('/', (req, res) => this.post(req, res));
    this._router.put('/', (req, res) => this.put(req, res));
    this._router.delete('/', (req, res) => this.delete(req, res));
  }

  async getAll(req, res){
    var items = await this.configsRepository.getAllAsync();

    res.send(items);
  }

  async getByApplicationAndEnvironmentAsync(req, res) {

    const params = req.params;

    var isApplication = params.hasOwnProperty('application') && params.application.trim() !== '';
    var isEnvironment = params.hasOwnProperty('environment') && params.environment.trim() !== '';

    if (isApplication && isEnvironment){
      var data = await this.configsRepository.getByApplicationAndEnvironmentAsync(params.application, params.environment);

      if (data){
        res.send(data);
      }else{
        res.sendStatus(404);
      }
    }else{

      var text = '';
      if (!isApplication) text += `param 'application' not found`;
      if (!isEnvironment) text += `param 'environment' not found`;

      return res.status(400).send(this.getErrorJson(text));
    }
  }

  async post(req, res) {

    const params = req.body;

    var isApplication = params.hasOwnProperty('application') && params.application.trim() !== '';
    var isEnvironment = params.hasOwnProperty('environment') && params.environment.trim() !== '';
    var isJson = params.hasOwnProperty('json') && params.environment.trim() !== '';

    if (isApplication && isEnvironment && isJson) {

        var item = await this.configsRepository.getByApplicationAndEnvironmentAsync(params.application, params.environment);

        if (item){
          var text = `object with Application: ${params.application}, Environment: ${params.environment} is exists`;
          return res.status(400).send(this.getErrorJson(text));
        }

        item = await this.configsRepository.insert({
          application: params.application,
          environment: params.environment,
          json: params.json
        });

        res.status(201).send(item);
      }else{
        var text = '';

        if (!isApplication) text += `param 'application' not found`;
        if (!isEnvironment) text += `param 'environment' not found`;
        if (!isJson) text += `param 'json' not found`;

        return res.status(400).send(this.getErrorJson(text));
      }
  }

  async put(req, res) {

    var params = req.body;

    var item = await this.configsRepository.getByIdAsync(params.id);

    if (item) {

      var newItem = {
        id: item.id,
        application: params.hasOwnProperty('application') ? params.application : item.application,
        environment: params.hasOwnProperty('environment') ? params.environment : item.environment,
        json: params.hasOwnProperty('json') ? params.json : item.json
      }

      await this.configsRepository.updateAsync(newItem);

      res.status(200).send(newItem);
    } else {
      res.sendStatus(404);
    }
  }

  async delete(req, res) {

    var id = req.body.id;

    if (id){

      var item = await this.configsRepository.getByIdAsync(id);

      if (item) {
        await this.configsRepository.deleteAsync(id);
      }else{
        res.sendStatus(404);
      }

      res.sendStatus(204);
    }else{
      return res.status(400).send(this.getErrorJson(`param 'id' not found`));
    }
  }

}
