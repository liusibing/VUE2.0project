<template>
  <div class="main">
    <app-link v-show="$route.path !== '/home'" />

    <router-view />
  </div>
</template>

<script>
import AppLink from "./Link.vue";
export default {
  data() {
    return {};
  },
  components: {
    AppLink,
  },

  methods: {},
};
</script>

<style scoped>
.el-breadcrumb {
  height: 10px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0, 0, 0, 0.1);
}
</style>