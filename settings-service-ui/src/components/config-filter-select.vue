<template>
  <div class="col-12 d-flex justify-content-between">
    <div class="col-6">
        <v-select placeholder="Select Application"
            :options="applications"
            v-model="applicationSelected"
            @input="onChange_Config"
             />
    </div>
    <div class="col-6">
        <v-select placeholder="Select Environment"
            :options="environments"
            v-model="environmentSelected"
            @input="onChange_Config"
             />
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: 'config-filter-select',
  components: {
    vSelect
  },
  props: {
    configs: Array
  },
  data: function() {
    return {
      applicationSelected: "",
      environmentSelected: "",
    }
  },
  methods: {

    unique: function (value, index, self) {
      return self.indexOf(value) === index;
    },

    getConfigsFiltered: function() {

      var vue = this;
      var configs = this.configs;

      if (this.applicationSelected) {
        configs = configs.filter(x => x.application === vue.applicationSelected)
      }

      if (this.environmentSelected) {
        configs = configs.filter(x => x.environment === vue.environmentSelected)
      }

      return configs;
    },

    // events

    onChange_Config: function() {
      this.$emit('changed', this.getConfigsFiltered());
    }

  },
  computed: {
    applications: function() {
        var vue = this;
        var configs = this.configs;

        if (this.environmentSelected) {
            configs = configs.filter(x => x.environment === vue.environmentSelected)
        }

        return configs.map(x => x.application).filter(this.unique);
      },
      environments: function() {
        var vue = this;
        var configs = this.configs;

        if (this.applicationSelected) {
          configs = configs.filter(x => x.application === vue.applicationSelected)
        }

        return configs.map(x => x.environment).filter(this.unique);
      }
  },
  created: function() {

  }
}
</script>
