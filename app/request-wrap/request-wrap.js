const request = require('request');

module.exports = class RequestWrap {
    constructor(options) {
        this._proxy = options.proxy !== undefined ? options.proxy : '';
    }

    setProxy(proxy){
        this._proxy = proxy;
    }

    async getAsync(url){

        var that = this;
        return new Promise(function(resolve, reject) {
            request.get({
                'url': url,
                'proxy': that._proxy,
            }, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        })
    }

    async postAsync(url, data){

        var that = this;
        return new Promise(function(resolve, reject) {
            request.post({
                'url': url,
                'headers': {'content-type' : 'application/json'},
                'proxy': that._proxy,
                'form': data
            }, (err, res) =>{
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        });
    }
}
