const BaseRouter = require('./base-router');

module.exports = class SettingRouter extends BaseRouter {

  constructor(options) {

    super(options);

    this.settingsRepository = this._services.get('SettingsRepository');

    this._router.get('/setting', (req, res) => this.getAll(req, res));
    this._router.post('/setting', (req, res) => this.post(req, res));
    this._router.put('/setting', (req, res) => this.put(req, res));
    this._router.delete('/setting', (req, res) => this.delete(req, res));
  }

  async getAll(req, res){
    console.log('************ GET ALL ************************');
    var items = await this.settingsRepository.getAllAsync();
    console.log('************ GET ALL2 ************************');
    res.send(items);
  }

  async post(req, res) {

    const params = req.body;

    var isKey = params.hasOwnProperty('key') && params.key.trim() !== '';
    var isValue = params.hasOwnProperty('value');

    if (isKey && isValue) {

        var item = await this.settingsRepository.getByKeyAsync(params.key);

        if (item){
          var text = `object with Key: ${params.key} is exists`;
          return res.status(400).send(this.getErrorJson(text));
        }

        item = await this.settingsRepository.insertAsync({
          key: params.key,
          value: params.value
        });

        res.status(201).send(item);
      }else{
        var text = '';

        if (!isKey) text += `param 'key' not found`;
        if (!isValue) text += `param 'value' not found`;

        return res.status(400).send(this.getErrorJson(text));
      }
  }

  async put(req, res) {

    console.log('************ PUT ************************');

    var params = req.body;

    var item = await this.settingsRepository.getByIdAsync(params.id);

    if (item) {

      var newItem = {
        id: item.id,
        key: params.hasOwnProperty('key') ? params.key : item.key,
        value: params.hasOwnProperty('value') ? params.value : item.value
      }

      console.log('************ PUT2 ************************');
      await this.settingsRepository.updateAsync(newItem);

      console.log('************ PUT3 ************************');
      res.status(200).send(newItem);
    } else {
      res.sendStatus(404);
    }
  }

  async delete(req, res) {

    var id = req.body.id;

    if (id){

      var item = await this.settingsRepository.getByIdAsync(id);

      if (item) {
        await this.settingsRepository.deleteAsync(id);
      }else{
        res.sendStatus(404);
      }

      res.sendStatus(204);
    }else{
      return res.status(400).send(this.getErrorJson(`param 'id' not found`));
    }
  }

}
