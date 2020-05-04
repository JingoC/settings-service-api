<template>
    <div class="col-12 mt-4">
        <div class="col-12 d-flex justify-content-between">
            <div class="col-8">
                <config-filter-select
                :configs="configs"
                @changed="onChanged_FilterConfigs"></config-filter-select>
            </div>
            <div class="col-2 h-100"></div>
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
                            {{config.value}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import ConfigFilterSelect from '../../components/config-filter-select'

export default {
  name: 'tab-read-view',
  components: {
      ConfigFilterSelect
  },
  data: function() {
    return {
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
                    key: key,
                    value: JSON.stringify(o[key])
                })
            }
        });
    },

    // events
    onChanged_FilterConfigs: function(filtedConfigs) {
        this.selectedConfigs = filtedConfigs;

        this.updateKeyValue();
    }

    // requests
  }
}
</script>
