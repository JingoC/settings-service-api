<style>
select {
    text-align: center;
    text-align-last: center;
}

option {
  text-align: center;
}
</style>

<template>
    <div class="col-12 mt-4" :key="forceRender">
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
        <div class="col-12 d-flex mt-5 justify-content-center" v-if="isValidSettings">
            <table class="table table-sm col-12">
                <thead class="thead-light">
                    <tr>
                    <th class="align-middle">Key</th>
                    <th class="align-middle">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="align-middle">provider</td>
                        <td class="align-middle">
                            <select
                                class="form-control form-control-sm text-center"
                                v-model="settings.provider.value"
                                @change="onChange_Provider"
                                >
                                <option value='sqlite'>sqlite</option>
                                <option value='mssql'>mssql</option>
                                <option value='postgres'>postgres</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-middle">host</td>
                        <td class="align-middle">
                            <input type="text"
                                class="form-control form-control-sm text-center"
                                v-model="settings.host.value"
                                :disabled="disabledHost()"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-middle">database</td>
                        <td class="align-middle">
                            <input type="text"
                                class="form-control form-control-sm text-center"
                                v-model="settings.database.value" />
                        </td>
                    </tr>
                    <tr>
                        <td class="align-middle">username</td>
                        <td class="align-middle">
                            <input type="text"
                                class="form-control form-control-sm text-center"
                                v-model="settings.username.value"
                                :disabled="disabledUsername()"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-middle">password</td>
                        <td class="align-middle">
                            <input type="text"
                                class="form-control form-control-sm text-center"
                                v-model="settings.password.value"
                                :disabled="disabledPassword()"/>
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
        settings: {
            provider: '',
            host: '',
            database: '',
            username: '',
            password: ''
        },
        forceRender: 0
    }
  },
  methods: {

    disabledHost: function() {
        return this.settings.provider.value === 'sqlite';
    },
    disabledUsername: function() {
        return this.settings.provider.value === 'sqlite';
    },
    disabledPassword: function() {
        return this.settings.provider.value === 'sqlite';
    },

    // events

    onClick_UpdateConfig: async function() {

        var vue = this;
        var promisses = [];

        for(var key in this.settings){
            var o = this.settings[key];

            if (o.value !== o.default) {
                var updateObject = {
                    id: o.id,
                    key: key,
                    value: o.value
                };
                console.log(updateObject);
                promisses.push(this.updateSettingAsync(updateObject));
            }
        }

        Promise.all(promisses).then(async function() {
            await vue.getSettingsAsync();

            this.$emit('updated');
        });
    },

    onChange_Provider: function() {
        this.forceRender++;
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
        var vue = this;
        var settings = await SettingApi.getAllAsync();

        this.settings = {};

        settings.forEach(function(x) {
            vue.settings[x.key] = {};

            vue.settings[x.key]['id'] = x.id;
            vue.settings[x.key]['value'] = x.value;
            vue.settings[x.key]['default'] = x.value;
        });
    }
  },
  computed: {
        isValidSettings: function() {
            var isValid = Object.prototype.hasOwnProperty.call(this.settings, 'provider') &&
                            Object.prototype.hasOwnProperty.call(this.settings.provider, 'value');
            return isValid;
        }
  },
  created: async function() {
    await this.getSettingsAsync();
  }
}
</script>
