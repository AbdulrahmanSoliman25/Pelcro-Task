<template>
  <v-text-field
    dense
    filled
    rounded
    v-model="val"
    :label="label"
    :type="type"
    :rules="rules"
  ></v-text-field>
</template>

<script>
export default {
  name: "app-input",
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    rules: {
      type: [Object, Array],
      default: function () {
        return [(v) => !!v || `${this.label} is required`];
      },
    },
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style></style>
