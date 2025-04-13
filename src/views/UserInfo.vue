<template>
  <v-form style="width: 80%;margin: 0 auto;">
    <h1>用户信息</h1>
    <v-container>
      <v-row         no-gutters>
        <v-col align-self="center" justify="center">
          <v-avatar color="info" size="100" :align="center">
            <v-img
              alt="John"
              :src="editedItem.headerImage"
            ></v-img>
          </v-avatar>
          <v-spacer></v-spacer>
          <input type="file" @change="handleFileUpload" />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          用户id
          <v-text-field
            v-model="editedItem.id"
            :counter="10"
            :rules="nameRules"
            required
            density="default"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          用户姓名:
          <v-text-field
            v-model="editedItem.username"
            :counter="10"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          联系方式:
          <v-text-field
            v-model="editedItem.phone"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          电子邮箱:
          <v-text-field
            v-model="editedItem.email"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          所在部门:
          <v-text-field
            v-model="editedItem.department"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          出生年月:
          <v-text-field
            v-model="editedItem.birthday"
            label="选择日期"
            readonly
            @click="showDatePicker = true"
            append-icon="mdi-calendar"
            @click:append="showDatePicker = true"
          ></v-text-field>

          <v-dialog
            v-model="showDatePicker"
            max-width="290px"
          >
            <v-date-picker
              v-model="editedItem.birthday"
              @input="onDateSelected()"
              @update:model-value="onDateSelected()"
            ></v-date-picker>
          </v-dialog>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          性别:
          <v-text-field
            v-model="editedItem.sex"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          注册时间:
          <v-text-field
            v-model="editedItem.createTime"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" align-self="center" justify="center">
          <v-btn rounded="xl" size="x-large" block @click="save()">保存</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script setup>
import {reactive, ref, watch} from 'vue'
  import {fi} from "vuetify/locale";
  import link from "@/api/Link.js";

  const showDatePicker = ref(false);
  const editedItem = ref({
    id: '',
    username: '',
    address: '',
    phone: '',
    email: '',
    sex: '',
    birthday: Date.now(),
    headerImage: 'https://cdn.vuetifyjs.com/images/john.jpg',
    department: '',
    createTime: '',
  })

  const imageUrl = ref(null);
  function handleFileUpload(event) {
    console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    link("/User/uploadFile", 'POST',formData, {}, {}, ).then(response => {
      if (response.status === 200) {
        console.log(response.data);
        editedItem.value.headerImage = "http://127.0.0.1:9000" + response.data;
      }
    })
  }
  function onDateSelected() {
    // 当选择日期后，自动关闭日期选择器
    showDatePicker.value = false
    console.log(showDatePicker.value)
  }
  function save() {
    link("/User/save", 'POST',{
      'id': editedItem.value.id,
      'username': editedItem.value.username,
      'address': editedItem.value.address,
      'phone': editedItem.value.phone,
      'email': editedItem.value.email,
      'sex': editedItem.value.sex,
      'birthday': editedItem.value.birthday,
      'headerImage': editedItem.value.headerImage,
      'department': editedItem.value.department,
      'createTime': editedItem.value.createTime,
    }, {}, {}, ).then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
  }
  function initialize () {
    editedItem.value.headerImage = "https://cdn.vuetifyjs.com/images/john.jpg";

    link("/User/detail", 'GET',{}, {
      'userId': 1,
    }, {}, ).then(response => {
      if (response.status === 200) {
        console.log(response.data);
        editedItem.value = response.data;
        editedItem.value.headerImage = "http://127.0.0.1:9000" + response.data.headerImage;
      }
    })
  }
  initialize()
</script>
<style>
  v-text-field {
    height: 10px;
  }
</style>
