<template>
  <v-app>
    <v-layout row justify-center align-content-start>
      <v-container fluid>
        <v-toolbar dark color="#32aea1" class="hidden-xs-and-down">
          <v-toolbar-title
            ><v-img
              class="mx-2"
              :src="require('@/assets/logo.svg')"
              max-height="60"
              max-width="100"
              contain
            ></v-img>
          </v-toolbar-title>
          <v-row justify="center" align="center">
            <v-toolbar-items> </v-toolbar-items>
            <v-spacer></v-spacer>
          </v-row>
        </v-toolbar>
        <LoadingScreen v-if="loadingStatus" />
      </v-container>
      <v-container fluid my-5>
        <v-layout column align-center>
          <v-main style="width: 80%">
            <router-view />
          </v-main>
        </v-layout>
      </v-container>
    </v-layout>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import LoadingScreen from "./views/Loading.vue";
export default {
  name: "App",
  components: {
    LoadingScreen,
  },
  computed: {
    ...mapGetters(["loadingStatus"]),
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped>
.v-application .my-5 {
  margin-top: 5% !important;
}
</style>
