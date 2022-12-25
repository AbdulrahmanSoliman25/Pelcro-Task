<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="customers"
      disable-pagination
      :hide-default-footer="true"
      @click:row="editCustomer"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#32aea1" dark class="mb-2" v-bind="attrs" v-on="on">
                New Customer
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <AppInput
                          :type="'text'"
                          :label="'First Name'"
                          v-model="editedCustomer.first_name"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <AppInput
                          :type="'text'"
                          :label="'Last Name'"
                          v-model="editedCustomer.last_name"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <AppInput
                          :rules="emailRules"
                          :label="'E-mail'"
                          v-model="editedCustomer.email"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <AppInput
                          :rules="usernameRules"
                          :type="'text'"
                          :label="'Username'"
                          v-model="editedCustomer.username"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <AppInput
                          :type="'number'"
                          :label="'Salary'"
                          v-model="editedCustomer.salary"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-radio-group
                          required
                          row
                          v-model="editedCustomer.status"
                        >
                          <v-radio
                            v-for="n in 3"
                            :key="n"
                            :label="`status ${n}`"
                            :value="n"
                            color="#32aea1"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#32aea1" text @click="close"> Cancel </v-btn>
                <v-btn color="#32aea1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6"
                >Are you sure, you want to delete this customer?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn elevation="2" color="#4c4c4c" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  elevation="2"
                  color="#4c4c4c"
                  text
                  @click="deleteCustomerConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click.stop="showCustomer(item)"
          >mdi-television</v-icon
        >
        <v-icon small class="mr-2" @click.stop="editCustomer(item)">
          mdi-pencil
        </v-icon>
        <v-icon small color="red" @click.stop="deleteCustomer(item)">
          mdi-delete
        </v-icon>
      </template></v-data-table
    >
    <v-pagination
      class="mt-5"
      dark
      color="#546e7a"
      v-model="page"
      :length="Math.ceil(pagination.total / pagination.per_page)"
      total-visible="10"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
      @input="handlePageChange"
    ></v-pagination>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import AppInput from "@/components/forms/input/Index.vue";
import AppSwitch from "@/components/forms/switch/Index.vue";

export default {
  name: "customers",
  components: {
    AppInput,
    AppSwitch,
  },
  data() {
    return {
      headers: [
        {
          text: "First Name",
          align: "start",
          sortable: false,
          value: "first_name",
        },
        { text: "Last Name", value: "last_name" },
        { text: "Email", value: "email" },
        { text: "User Name", value: "username" },
        { text: "Salary", value: "salary" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      id: undefined,
      editedIndex: -1,
      dialog: false,
      dialogDelete: false,
      editedCustomer: {
        id: undefined,
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        salary: 0,
        status: 1,
      },

      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) =>
          /^[\w-]*$/.test(v) || "Username must be in an alphanumeric format",
      ],
    };
  },
  computed: {
    ...mapGetters("Customer", ["customers", "pagination", "page"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Customer" : "Edit Customer";
    },
  },
  methods: {
    ...mapMutations("Customer", ["setPage"]),
    ...mapActions("Customer", [
      "getCustomersAction",
      "createCustomerAction",
      "updateCustomerAction",
      "deleteCustomerAction",
    ]),
    showCustomer(item) {
      this.$router.push({
        name: "customer",
        params: {
          id: item.id,
        },
      });
    },
    handlePageChange(value) {
      this.setPage(value)
      this.getCustomersAction(this.page);
    },

    editCustomer(customer) {
      this.editedIndex = this.customers.indexOf(customer);
      this.editedCustomer = Object.assign({}, customer);
      this.dialog = true;
    },

    deleteCustomer(customer) {
      this.id = customer.id;
      this.editedIndex = this.customers.indexOf(customer);
      this.editedCustomer = Object.assign({}, customer);
      this.dialogDelete = true;
    },

    deleteCustomerConfirm() {
      this.deleteCustomerAction(this.id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedCustomer = Object.assign({}, this.defaultCustomer);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedCustomer = Object.assign({}, this.defaultCustomer);
        this.editedIndex = -1;
      });
    },

    save() {
      if (!this.$refs.form.validate()) return;
      if (this.editedIndex > -1) {
        this.updateCustomerAction(this.editedCustomer);
      } else {
        this.createCustomerAction(this.editedCustomer);
      }
      this.close();
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getCustomersAction(this.page);
  },
};
</script>

<style scoped>
.v-pagination {
  background-color: #546e7a !important;
}
</style>
