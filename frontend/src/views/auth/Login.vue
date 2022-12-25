<template>
  <v-container
    class="wrapper"
    :class="$vuetify.breakpoint.xs ? 'rounded-xl' : 'rounded-lg'"
  >
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col sm="6" offset-sm="3" cols="10" offset="1">
          <h2 style="text-align: center">Login form</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="6" offset-sm="3" cols="10" offset="1">
          <AppInput
            :rules="emailRules"
            :label="'E-mail'"
            v-model="email"
            @keyup.enter="login"
          />
        </v-col>
        <v-col sm="6" offset-sm="3" cols="10" offset="1">
          <AppInput
            :label="'Password'"
            v-model="password"
            :type="'password'"
            @keyup.enter="login"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          sm="4"
          offset-sm="4"
          cols="10"
          offset="1"
          :class="$vuetify.breakpoint.xs ? 'mb-6' : 'mb-1'"
        >
          <v-btn
            block
            elevation="2"
            class="white--text"
            color="#4c4c4c"
            @click="login"
            >login</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import AppInput from "@/components/forms/input/Index.vue";
import { mapActions } from "vuex";
export default {
  name: "login",
  components: {
    AppInput,
  },
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    ...mapActions("Auth", ["loginAction"]),
    login() {
      this.$refs.form.validate()
        ? this.loginAction({
            email: this.email,
            password: this.password,
          })
        : false;
    },
  },
  created() {},
};
</script>

<style scoped>
.wrapper {
  background-color: #32aea1;
}
</style>
