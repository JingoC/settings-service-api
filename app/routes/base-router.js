const express = require('express');
const router = express.Router();

module.exports = class BaseRouter {
    constructor(options) {
      this._services = options.services;
      this._router = router;
    }

    getRouter(){
        return this._router;
    }
}