<template>
    <div class="col-12 mt-4">
        <div class="col-12 d-flex justify-content-between">
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
                    <tr v-for="(setting, i) in settings" :key="i">
                        <td>{{setting.key}}</td>
                        <td>
                            <input type="text" class="form-control-sm w-100" v-model="setting.value" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import SettingApi from '../../api/setting-api.js'

export default {
  name: 'tab-setting-view',
  data: function() {
    return {
        defaultSettings: [],
        settings: []
    }
  },
  methods: {

    // events

    onClick_UpdateConfig: async function() {

        var vue = this;

        var promisses = this.settings
            .filter(x => x.value !== x.default)
            .map(x =>  vue.updateSettingAsync({
                    id: x.id,
                    key: x.key,
                    value: x.value
                })
            );

        console.log(promisses);
        Promise.all(promisses).then();
        console.log(promisses);

        await this.getSettingsAsync();
    },

    // requests

    updateSettingAsync: async function(item) {

        var data = {
            id: item.id,
            key: item.key,
            value: item.value
        };

        try{
            return await SettingApi.putAsync(data);
        }catch(e){
            console.log(e);
            return null;
        }
    },

    getSettingsAsync: async function() {
        this.settings = await SettingApi.getAllAsync();

        this.settings.forEach(function(x) {
            x['default'] = x.value
        });
    }
  },
  created: async function() {
    await this.getSettingsAsync();
  }
}
</script>
