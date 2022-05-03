<template>
  <div>
    <!-- 头部区域 -->
    <app-header />
    <!-- 左侧导航 -->
    <app-navbar />
    <!-- 右侧主区域 -->
    <app-main />
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppNavbar from "./AppNavbar";
import AppMain from "./AppMain";
export default {
  data() {
    return {};
  },

  components: {
    AppHeader,
    AppNavbar,
    AppMain,
  },

  methods: {},
};
</script>

<style>
.header {
  position: absolute;
  line-height: 50px;
  top: 0;
  left: 0;
  right: 0;
  background-color: #2d3a4b;
}
.navbar {
  position: absolute;
  width: 230px;
  top: 50px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: #545c64;
}
.main {
  position: absolute;
  top: 50px;
  left: 230px;
  right: 0;
  bottom: 0;
  padding: 0;
  overflow-y: auto;
  /* background-color: #234edc; */
}
</style>