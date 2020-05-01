module.exports = class DIContainer {

    constructor() {

        this.container = [];

    }

    add(name, service) {

        if (this.container.some(x => x.Name === name)) {
            throw `Service with name '${name}' already registered`;
        }

        this.container.push({
            Name: name,
            Service: service
        });
    }

    get(name) {
        if (this.container.some(x => x.Name === name)) {
            var service = this.container.find(x => x.Name === name).Service;
            return service;
        }else{
            throw `Service with name '${name}' not found`;
        }
    }

}