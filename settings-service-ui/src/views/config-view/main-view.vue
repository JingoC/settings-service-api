﻿<template>
    <div class="col-12" :key="forceRender">
        <vue-tabs>
            <v-tab title="Setting"
                @updated="onUpdated_Settings">
                <tab-setting-view></tab-setting-view>
            </v-tab>
            <!--
            <v-tab title="Export\Import">
                <tab-export-import-view :configs="configs"></tab-export-import-view>
            </v-tab>
            -->
            <v-tab title="Read">
                <tab-read-view :configs="configs"></tab-read-view>
            </v-tab>
            <v-tab title="Delete">
                <tab-delete-view
                    v-bind:configs.sync="configs"
                    @deleted="onDeleted_Config"
                ></tab-delete-view>
            </v-tab>
            <v-tab title="Insert">
                <tab-insert-view :configs="configs"></tab-insert-view>
            </v-tab>
            <v-tab title="Update">
                <tab-update-view :configs="configs"></tab-update-view>
            </v-tab>
        </vue-tabs>
    </div>
</template>

<script>

import ConfigApi from '../../api/config-api.js'

import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

import TabInsertView from './tab-insert-view'
import TabReadView from './tab-read-view'
import TabUpdateView from './tab-update-view'
import TabDeleteView from './tab-delete-view'
//import TabExportImportView from './tab-export-import-view'
import TabSettingView from '../setting-view/tab-setting-view'

export default {
  name: 'main-view',
  components: {
    VueTabs, VTab, TabInsertView, TabReadView, TabUpdateView, TabDeleteView,
    //TabExportImportView,
    TabSettingView
  },
  data: function() {
    return {
        configs: [],
        forceRender: 0
    }
  },
  methods: {

        // events

        onDeleted_Config: async function() {
            this.configs = await this.getAllConfigs();
            this.forceRender++;
        },

        onUpdated_Settings: async function() {
            this.configs = await this.getAllConfigs();
            this.forceRender++;
        },

        // requests

        getAllConfigs: async function() {
            try{
                return await ConfigApi.getAllAsync();
            }catch(e){
                console.log(e);
                return [];
            }
        }
  },
  created: async function() {
      this.configs = await this.getAllConfigs();
  }
}
</script>
