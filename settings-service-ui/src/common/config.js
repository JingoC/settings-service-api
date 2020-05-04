export default{

    config: null,
    getConfig: function() {

        if (process.env.NODE_ENV === 'development') {
            this.config = {
                baseUrl: 'http://localhost:8000'
            }
        }else if (process.env.NODE_ENV === 'production') {
            this.config = {
                baseUrl: ''
            }
        }else {
            console.log(`env not found: ${process.env.NODE_ENV}`);
        }

        return this.config;
    },

    getBaseUrl: function() {
        return this.config ? this.config.baseUrl : this.getConfig().baseUrl;
    }
}