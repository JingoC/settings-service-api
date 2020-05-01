const BaseRouter = require('./base-router');

module.exports = class ConfigRouter extends BaseRouter {

  constructor(options) {

    super(options);

    this.configsRepository = this._services.get('ConfigsRepository');

    this._router.get('/:application/:environment', (req, res) => this.getByApplicationAndEnvironmentAsync(req, res));
    this._router.get('/', (req, res) => this.getAll(req, res));
    this._router.post('/', (req, res) => this.post(req, res));
    this._router.put('/:id', (req, res) => this.put(req, res));
    this._router.delete('/:id', (req, res) => this.delete(req, res));
  }

  getAll(req, res){
    res.send(this.configsRepository.getAll());
  }

  getByApplicationAndEnvironmentAsync(req, res) {

    const params = req.params;
    if (params.hasOwnProperty('application') && params.hasOwnProperty('environment')){
      var data = this.configsRepository.getByApplicationAndEnvironmentAsync(params.application, params.environment);

      if (data){
        res.send(data);
      }else{
        res.sendStatus(404);
      }
    }else{
      res.sendStatus(400);
    }
  }

  post(req, res) {
    //req.body.title,
    res.status(201).json(newItem);
  }

  put(req, res) {
    //req.body.
    
    let found = data.find(function (item) {
      return item.id === parseInt(req.params.id);
    });

    if (found) {

      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }

  async delete(req, res) {
    if (found) {
    
    }

    res.sendStatus(204);
  }

}
