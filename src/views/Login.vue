<template>
  <AppHeader />
  <v-app>
      <v-container class="align-center justify-center">
        <Login />
      </v-container>
  </v-app>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import Login from "@/components/Login.vue";
</script>

<style scoped>
</style>
