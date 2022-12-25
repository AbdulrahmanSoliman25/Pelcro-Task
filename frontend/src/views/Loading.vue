<template>
  <div id="loading">
    <v-container>
      <v-row justify="center">
        <span>loading...</span>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "loading-screen",
};
</script>
<style scoped>
#loading {
  background-color: #63ab97;
  color: white;
  justify-content: center;
}
</style>
