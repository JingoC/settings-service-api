<style>
table {width:100%; table-layout: fixed;}
table td {word-wrap:break-word;}
</style>

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
                    v-on:click="onClick_Delete">
                    Delete
                </button>
            </div>
        </div>
        <div class="col-12 mt-5 d-flex justify-content-center">
            <table class="table table-sm table-fixed">
                <thead class="thead-light">
                    <tr>
                        <th class="align-middle" width="3%"></th>
                        <th class="align-middle" width="7%">Id</th>
                        <th class="align-middle" width="20%">Application</th>
                        <th class="align-middle" width="10%">Environment</th>
                        <th class="align-middle" width="60%">
                            <div class="col-12">Json</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(config, i) in selectedConfigs" :key="i">
                        <td class="align-middle">
                            <input
                                type="checkbox"
                                class="form-control"
                                v-model="config.isDelete"
                                />
                        </td>
                        <td class="align-middle">{{config.id}}</td>
                        <td class="align-middle">{{config.application}}</td>
                        <td class="align-middle">{{config.environment}}</td>
                        <td class="align-middle">
                            <textarea
                                    class="form-control form-control-sm col-12"
                                    wrap='off'
                                    rows="6"
                                    v-html="getJsonNormolize(config.json)" readonly>
                            </textarea>
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
  name: 'tab-delete-view',
  components: {
      ConfigFilterSelect
  },
  props: {
      configs: Array
  },
  data: function() {
    return {
        selectedConfigs: this.configs,
        checkBoxIds: []
    }
  },
  methods: {

    getJsonNormolize: function(json) {
        return JSON.stringify(JSON.parse(json), null, "\t");
    },

      // events
    onChanged_FilterConfigs: function(filtedConfigs) {

        var vue = this;
        this.selectedConfigs = [];

        filtedConfigs.forEach(function(x) {
            var v = x;
            v['isDelete'] = false;

            vue.selectedConfigs.push(v);
        });
    },

    onClick_Delete: function() {

        var vue = this;
        this.selectedConfigs.filter(x => x.isDelete).forEach(async function(x) {
            await vue.deleteConfigsAsync(x.id);
        });

        this.selectedConfigs = this.selectedConfigs.filter(x => !x.isDelete);

        this.$emit('deleted');
    },

    // reqeust

    deleteConfigsAsync: async function(id) {

        var data = {
            id: id
        };

        try{
            return await ConfigApi.deleteAsync(data);
        }catch(e){
            console.log(e);
            return null;
        }
    }
  }
}
</script>
