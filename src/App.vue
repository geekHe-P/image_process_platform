<template>
      <router-view/>
<!--    <Welcome/>-->
<!--      <home></home>-->
      <img src=""/>
</template>

<script>
  import Welcome from "@/components/Welcome.vue";
  import Home from "@/components/Home.vue";
  export default {
      name: "App",
      components: {Home, Welcome},
  }

</script>

<style scoped>

</style>


