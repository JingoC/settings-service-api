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
        <div class="col-12 mt-5 d-flex justify-content-center">
            <table class="table table-sm table-fixed">
                <thead class="thead-light">
                    <tr>
                        <th width="20%">Application</th>
                        <th width="10%">Environment</th>
                        <th width="70%">
                            <div class="col-12">Json</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(config, i) in selectedConfigs" :key="i">
                        <td class="align-middle">{{config.application}}</td>
                        <td class="align-middle">{{config.environment}}</td>
                        <td class="align-middle">
                            <table>
                                <thead class="thead-light">
                                    <tr>
                                        <th width="40%">Key</th>
                                        <th width="60%">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="o in getKeyValueArray(config.json)" :key="o.key">
                                        <td class="align-middle">
                                            <small>
                                                {{o.key}}
                                            </small>
                                        </td>
                                        <td class="align-middle">
                                            <small>
                                                {{o.value}}
                                            </small>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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

    getKeyValueArray: function(json) {

        var dictionaryConfigs = [];

        var o = JSON.parse(json);

        for (var key in o) {
            dictionaryConfigs.push({
                key: key,
                value: JSON.stringify(o[key])
            })
        }

        return dictionaryConfigs;
    },

    // events
    onChanged_FilterConfigs: function(filtedConfigs) {
        this.selectedConfigs = filtedConfigs;
    }

    // requests
  }
}
</script>
