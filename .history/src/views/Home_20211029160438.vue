<template>
 <router-view></router-view>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from 'vue-router'


Vue.use(router);

Vue.use(VueRouter);
  export default {
    name: 'Home',
  }
</script>
