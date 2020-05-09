<template>
    <div class="col-12 mt-4">
        <div class="col-12 d-flex justify-content-between">
            <div class="col-8">
                <config-filter-select
                :configs="configs"
                :onlyFullSelect="true"
                @changed="onChanged_FilterConfigs"></config-filter-select>
            </div>
            <div class="col-2">
                <button type="button"
                    class="btn btn-primary w-100"
                    v-on:click="onClick_UpdateConfig"
                    :disabled="selectedConfig == null" >
                    Update
                </button>
            </div>
        </div>
        <div class="col-12 d-flex mt-5 justify-content-center">
            <table class="table table-sm col-12">
                <thead class="thead-light">
                    <tr>
                    <th width="5%" class="align-middle"></th>
                    <th width="30%" class="align-middle">Key</th>
                    <th width="65%" class="align-middle">Value</th>
                    </tr>
                </thead>
                <tbody v-show="selectedConfig != null">
                    <tr v-for="(config, i) in dictionaryConfigs" :key="i">
                        <td class="align-middle">
                            <button
                                class="w-100 btn btn-danger btn-sm"
                                v-on:click="config.isDeleted=true"
                                v-if="!config.isDeleted">
                                Delete
                            </button>
                            <button
                                class="w-100 btn btn-warning btn-sm"
                                v-on:click="config.isDeleted=false"
                                v-else>
                                Revert
                            </button>
                        </td>
                        <td class="align-middle">
                            <input type="text" class="form-control-sm w-100" v-model="config.key" />
                        </td>
                        <td class="align-middle">
                            <input type="text" class="form-control-sm w-100" v-model="config.value" />
                        </td>
                    </tr>
                    <tr>
                        <td class="align-middle">
                            <button
                                class="w-100 btn btn-success btn-sm"
                                v-on:click="onClick_AddRow">
                                Add
                            </button>
                        </td>
                        <td class="align-middle"></td>
                        <td class="align-middle"></td>
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
        selectedConfig: null,
        dictionaryConfigs: []
    }
  },
  props: {
      configs: { Type: Array, required: true }
  },
  methods: {

    updateKeyValue: function() {

        this.dictionaryConfigs = [];

        var o = JSON.parse(this.selectedConfig.json);

        for (var key in o) {
            this.dictionaryConfigs.push({
                id: this.selectedConfig.id,
                key: key,
                value: JSON.stringify(o[key]),
                isDeleted: false
            });
        }
    },

    // events

    onClick_AddRow: function() {
        this.dictionaryConfigs.push({
            id: this.selectedConfig.id,
            key: '',
            value: '',
            isDeleted: false
        });
    },

    onClick_UpdateConfig: async function() {

        var x = this.selectedConfig;

        var id = x.id;
        var app = x.application;
        var env = x.environment;

        var dict = this.dictionaryConfigs;

        var o = {};
        dict.forEach(function(y) {
            if (!y.isDeleted && y.key !== '') {
                o[y.key] = JSON.parse(y.value);
            }
        });

        await this.updateConfigAsync({
            id: id,
            application: app,
            environment: env,
            json: JSON.stringify(o)
        });
    },

    onChanged_FilterConfigs: function(filtedConfigs) {
        if (filtedConfigs.length > 0){
            this.selectedConfig = filtedConfigs[0];
            this.updateKeyValue();
        }else{
            this.selectedConfig = null;
        }
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
