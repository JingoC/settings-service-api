import config from '../common/config.js'
import axios from 'axios'

export default{

    getUrl: function() {
        return config.getBaseUrl() + '/setting';
    },

    getAllAsync: async function() {
        return (await axios.get(this.getUrl())).data;
    },

    insertAsync: async function(data) {
        return await axios.post(this.getUrl(), data);
    },

    putAsync: async function(data) {
        return await axios.put(this.getUrl(), data);
    },

    deleteAsync: async function(data) {
        return await axios.delete(this.getUrl(), {
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(data)
        });
    }
}