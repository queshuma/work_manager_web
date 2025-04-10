<template>
  <v-avatar color="info" size="100">
    <v-img
      alt="John"
      :src="imageUrl"
    ></v-img>
  </v-avatar>
  <input type="file" @change="handleFileUpload" />
</template>
<script setup>
  import {ref, watch} from 'vue'
  import {fi} from "vuetify/locale";
  import link from "@/api/Link.js";

  const files = ref([])
  const imageUrl = ref(null);
  function handleFileUpload(event) {
    console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    // link("/User/uploadImage", 'POST',formData, {}, {}, ).then(response => {
    link("/User/uploadFile", 'POST',formData, {}, {}, ).then(response => {
      if (response.status === 200) {
        console.log(response.data.url);
        imageUrl.value = "http://localhost:8181/" + response.data.name;
      }
    })
  }
  function initialize () {
    imageUrl.value = "https://cdn.vuetifyjs.com/images/john.jpg";
  }
  initialize()
</script>
