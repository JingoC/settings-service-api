<template>
    <div class="col-12 mt-4">
        <div class="col-12 d-flex">
            <div class="col-2 my-auto">Import: </div>
            <div class="col-6">
                <input type="text" class="form-control w-100" v-model="application" />
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-primary w-100" v-on:click="onClick_SelectDb">
                    Select
                </button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-primary w-100" v-on:click="onClick_ImportDb">
                    Import
                </button>
            </div>
        </div>
        <hr />
        <div class="col-12 d-flex mt-2">
            <div class="col-2 my-auto">
                <button type="button" class="btn btn-primary w-100" v-on:click="onClick_ExportDb">
                    Export
                </button>
            </div>
        </div>
    </div>
</template>

<script>

//import ConfigApi from '../../api/config-api.js'

export default {
  name: 'tab-export-import-view',
  components: {

  },
  data: function() {
    return {
        application: '',
        environment: '',
        json: ''
    }
  },
  props: {
      configs: Array
  },
  methods: {

        // events
        onClick_SelectDb: async function() {

        },

        onClick_ImportDb: async function() {

        },

        onClick_ExportDb: async function() {

        },

        // requests

  }
}
</script>
