<template>
  <el-image class="bg-image"
            src="https://img.js.design/assets/Resources/background/login-bg-5.jpg"
            fit="cover"
  ></el-image>
  <el-row>
    <el-col :span="12">

    </el-col>
    <el-col :span="12">
        <router-view />
    </el-col>
  </el-row>
</template>

<script>
import Login from "@/components/Login.vue";

  export default {
    name: "Welcome",
    components: {Login},
}
</script>

<style>
  .bg-image {
    width: 100%;
    height: 100vh;
    position: absolute !important;
    z-index: -1 !important;
  }

</style>