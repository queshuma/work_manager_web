<template>
  <v-layout>
    <v-app-bar border="b" class="px-md-4" flat>

      <template #prepend>
        <v-app-bar-nav-icon
          v-if="$vuetify.display.smAndDown"
          @click="drawer = !drawer"
        />
      </template>

      <v-img
        class="me-sm-8"
        max-width="40"
        src="https://cdn.vuetifyjs.com/docs/images/logos/v.svg"
      />

      <v-app-bar-title>元氏县殷氏镇文献管理系统</v-app-bar-title>

      <template #append>
        <v-btn
          class="ms-1 opacity-60"
          icon="mdi-bell-outline"
        />

        <v-btn class="ms-1" icon>
          <v-avatar image="https://cdn.vuetifyjs.com/images/john.png" />

          <v-menu activator="parent" origin="top">
            <v-list>
              <v-list-item link title="重新加载" />

              <v-list-item link title="退出账号" />
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>

    </v-main>
  </v-layout>
</template>
<script setup>
import { ref } from 'vue'

const drawer = ref(true)

const items = ref([
  {
    title: '数据面板',
    prependIcon: 'mdi-view-dashboard-outline',
    link: true,
  },
  {
    title: '档案借阅',
    prependIcon: 'mdi-account-group',
    link: true,
  },
  {
    title: '档案归还',
    prependIcon: 'mdi-briefcase-outline',
    link: true,
  },
  {
    title: '档案分类',
    prependIcon: 'mdi-calendar',
    link: true,
  },
  {
    title: '用户管理',
    prependIcon: 'mdi-file-chart-outline',
    link: true,
  },
])
</script>
