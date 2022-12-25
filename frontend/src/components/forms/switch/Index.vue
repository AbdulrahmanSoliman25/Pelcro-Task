<template>
  <v-switch
    v-model="val"
    :label="label"
    :color="color"
    :value="value"
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
      default: 0,
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
