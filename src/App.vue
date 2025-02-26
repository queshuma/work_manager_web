<script setup lang="js">
//
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import {  RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <RouterView />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style scoped>
  template {
    background-color: antiquewhite;
  }
</style>
