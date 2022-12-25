<template>
  <v-container
    class="wrapper"
    :class="$vuetify.breakpoint.xs ? 'rounded-xl' : 'rounded-lg'"
  >
    <v-row>
      <v-col sm="6" offset-sm="3" cols="10" offset="1">
        <h2 style="text-align: center">Customer info.</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="3" cols="6">
        <h3 style="text-align: end">First Name :</h3>
      </v-col>
      <v-col sm="3" cols="6">
        <h4>{{ customer.first_name }}</h4>
      </v-col>
      <v-divider vertical></v-divider>

      <v-col sm="3" cols="6">
        <h3 style="text-align: end">Last Name :</h3>
      </v-col>
      <v-col sm="3" cols="6">
        <h4>{{ customer.last_name }}</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="3" cols="6">
        <h3 style="text-align: end">User Name :</h3>
      </v-col>
      <v-col sm="3" cols="6">
        <h4>{{ customer.username }}</h4>
      </v-col>
      <v-divider vertical></v-divider>

      <v-col sm="3" cols="6">
        <h3 style="text-align: end">E-Mail :</h3>
      </v-col>
      <v-col sm="3" cols="6">
        <h4>{{ customer.email }}</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="3" cols="6">
        <h3 style="text-align: end">Salary :</h3>
      </v-col>
      <v-col sm="3" cols="6">
        <h4>{{ customer.salary }}</h4>
      </v-col>
      <v-divider vertical></v-divider>

      <v-col sm="3" cols="6">
        <h3 style="text-align: end">Status:</h3>
      </v-col>
      <v-col sm="3" cols="6">
        <h4>{{ status[customer.status] }}</h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppInput from "@/components/forms/input/Index.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "login",
  components: {
    AppInput,
  },
  data() {
    return {
      status: {
        1: "Active",
        2: "InActive",
        3: "Suspended",
      },
    };
  },
  computed: {
    ...mapGetters("Customer", ["customer"]),
  },
  methods: {
    ...mapActions("Customer", ["getCustomerAction"]),
  },
  created() {
    this.getCustomerAction(this.$route.params.id);
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #32aea1;
  padding-bottom: 3rem;
}
</style>
