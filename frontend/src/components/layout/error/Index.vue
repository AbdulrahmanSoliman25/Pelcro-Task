<template>
  <div class="border-alert" v-if="backendErrors.length != 0">
    <v-alert color="red lighten-2" dense outlined style="text-align: center">
      <v-btn
        icon
        x-small
        color="#FF6700"
        style="float: right"
        @click="clrearErrors"
      >
        <v-icon>mdi-close-outline</v-icon>
      </v-btn>

      <div v-for="(error, name) in backendErrors" :key="error.message">
        <p>{{ name }} : {{ error }}</p>
      </div>
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "errors",
  computed: {
    ...mapGetters(["backendErrors"]),
  },
  methods: {
    ...mapMutations(["setBackendErrors"]),
    clrearErrors() {
      this.setBackendErrors([]);
    },
  },
};
</script>
<style></style>
