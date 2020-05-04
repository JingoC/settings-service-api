<template>
    <div class="col-12 mt-4">
        <div class="col-12 d-flex justify-content-between">
            <div class="col-8">
                <config-filter-select
                :configs="configs"
                @changed="onChanged_FilterConfigs"></config-filter-select>
            </div>
            <div class="col-2">
                <button type="button" 
                    class="btn btn-primary w-100"
                    v-on:click="onClick_UpdateConfig"
                    >
                    Update
                </button>
            </div>
        </div>
        <div class="col-12 d-flex mt-5 justify-content-center">
            <table class="table table-sm col-12">
                <thead class="thead-light">
                    <tr>
                    <th>Key</th>
                    <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(config, i) in dictionaryConfigs" :key="i">
                        <td>{{config.key}}</td>
                        <td>
                            <input type="text" class="form-control-sm w-100" v-model="config.value" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import ConfigApi from '../../api/config-api.js'
import ConfigFilterSelect from '../../components/config-filter-select'

export default {
  name: 'tab-update-view',
  components: {
      ConfigFilterSelect
  },
  data: function() {
    return {
        application: '',
        environment: '',
        json: '',
        selectedConfigs: [],
        dictionaryConfigs: []
    }
  },
  props: {
      configs: Array
  },
  methods: {

    updateKeyValue: function() {

        var vue = this;
        this.dictionaryConfigs = [];

        console.log(this.selectedConfigs);
        this.selectedConfigs.forEach(function(x) {

            console.log(x);
            var o = JSON.parse(x.json);

            for (var key in o) {
                vue.dictionaryConfigs.push({
                    id: x.id,
                    key: key,
                    value: JSON.stringify(o[key])
                })
            }
        });
    },

    // events

    onClick_UpdateConfig: async function() {

        var vue = this;

        this.selectedConfigs.forEach(async function(x) {

            var id = x.id;
            var app = x.application;
            var env = x.environment;

            var dict = vue.dictionaryConfigs.filter(y => y.id === id);

            var o = {};
            dict.forEach(function(y) {
                o[y.key] = y.value
            })

            var response = await vue.updateConfigAsync({
                id: id,
                application: app,
                environment: env,
                json: JSON.stringify(o)
            });

            console.log(response);
        });
    },

    onChanged_FilterConfigs: function(filtedConfigs) {
        this.selectedConfigs = filtedConfigs;
        this.updateKeyValue();
    },

    // requests

    updateConfigAsync: async function(item) {

        var data = {
            id: item.id,
            application: item.application,
            environment: item.environment,
            json: item.json
        };

        try{
            return await ConfigApi.putAsync(data);
        }catch(e){
            console.log(e);
            return null;
        }
    }
  }
}
</script>
