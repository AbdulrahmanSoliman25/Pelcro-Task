<template>
  <v-switch
    v-model="val"
    :label="label"
    :rules="[(v) => !!v || `${label} is required`]"
    :color="color"
    :value="label"
    hide-details
  ></v-switch>
</template>

<script>
export default {
  name: "app-switch",
  props: {
    label: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#32aea1",
    },
    value: {
      type: Number,
      default: undefined,
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
