<template>
    <div class="col-12 mt-4">
        <div class="col-12 d-flex">
            <div class="col-2 my-auto">Application: </div>
            <div class="col-8">
                <input type="text" class="form-control w-100" v-model="application" />
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-primary w-100" v-on:click="onClick_InsertConfig">
                    Insert
                </button>
            </div>
        </div>
        <div class="col-12 d-flex mt-2">
            <div class="col-2 my-auto">Environment: </div>
            <div class="col-8">
                <input type="text" class="form-control w-100"  v-model="environment"/>
            </div>
        </div>
        <div class="col-12 d-flex mt-2">
            <div class="col-2 my-auto">Json: </div>
            <div class="col-8">
                <textarea rows="15" class="form-control w-100"  v-model="json"></textarea>
            </div>
        </div>
    </div>
</template>

<script>

import ConfigApi from '../../api/config-api.js'

export default {
  name: 'tab-insert-view',
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

        onClick_InsertConfig: async function() {

            console.log('click onClick_InsertConfig');

            var response = await this.insertConfigAsync({
                application: this.application,
                environment: this.environment,
                json: this.json
            });

            console.log(response);
        },

        // requests

        insertConfigAsync: async function(item) {

            var data = {
                application: item.application,
                environment: item.environment,
                json: item.json
            };

            try{
                console.log('send request');
                return await ConfigApi.insertAsync(data);
            }catch(e){
                console.log(e);
                return null;
            }
        }
  }
}
</script>
