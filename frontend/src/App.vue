<template>
  <v-app>
    <v-layout row justify-center align-content-start>
      <v-container fluid>
        <v-toolbar dark color="#32aea1" class="hidden-xs-and-down">
          <v-toolbar-title
            ><v-img
              class="mx-5"
              :src="require('@/assets/logo.svg')"
              max-height="60"
              max-width="100"
              contain
              to="/"
            ></v-img>
          </v-toolbar-title>
          <v-divider class="mx-4" vertical></v-divider>
          <v-row justify="center" align="center" v-if="isAuthenticated">
            <v-toolbar-items>
              <v-col>
                <v-btn
                  exact
                  key="customers"
                  to="/customers"
                  title="customers"
                  text
                >
                  customers</v-btn
                >
              </v-col>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-col>
                <v-btn exact key="logout" @click="logout" title="logout" text>
                  logout</v-btn
                >
              </v-col>
            </v-toolbar-items>
          </v-row>
        </v-toolbar>
        <LoadingScreen v-if="loadingStatus" />
      </v-container>
      <v-container fluid my-5>
        <v-layout column align-center>
          <v-main style="width: 80%">
            <v-col sm="6" offset="3" cols="12">
              <Error />
            </v-col>
            <router-view />
          </v-main>
        </v-layout>
      </v-container>
    </v-layout>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoadingScreen from "./views/Loading.vue";
import Error from "@/components/layout/error/Index.vue";
export default {
  name: "App",
  components: {
    LoadingScreen,
    Error,
  },
  computed: {
    ...mapGetters(["loadingStatus"]),
    ...mapGetters("Auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapActions("Auth", ["logoutAction"]),
    logout() {
      this.logoutAction();
    },
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
