<template>
  <a-layout-header class="headerStyle">
    <h2>元氏县殷氏镇文献管理系统</h2>
  </a-layout-header>
  <a-layout>
    <a-layout-sider class="siderStyle">
      <div class="logo">
        <h2 style="color: white"></h2>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" router>
        <div v-for="(v) in router.options.routes.slice(0, -1)" :key="v.path">
          <a-menu-item :index="v.path" v-if="!v.children" @click="currentPage(v)">
            <pie-chart-outlined />
            <span @click="skipLink(v.path)">{{ v.label }}</span>
          </a-menu-item>

          <a-sub-menu :index="v.path" v-else>
            <template #title>
            <span>
              <user-outlined />
              <span>{{ v.label }}</span>
            </span>
            </template>
            <a-menu-item v-for="val in v.children" :key="val.path" >
              <span @click="skipLink(val.path)">{{ val.label }}</span>
            </a-menu-item>
          </a-sub-menu>
        </div>
      </a-menu>
    </a-layout-sider>
    <a-layout-content class="contentStyle">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
  <a-layout-footer class="footerStyle">Footer</a-layout-footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import router from "@/router";
import { useRouter } from 'vue-router';
const selectedKeys = ref(['1']);

const router = useRouter();
onMounted(() => {
  console.log("获取路由规则", router.options)
})

function skipLink(data)  {
  selectedKeys.value = [data]
  router.push(data)
}

</script>

<style scoped>
.headerStyle {
  text-align: left;
  color: #fff;
  height: 64px;
  padding-inline: 50px;
  line-height: 64px;
  background-color: #7dbcea;
}
.contentStyle {
  text-align: center;
  min-height: 120px;
  line-height: 120px;
  color: #fff;
  background-color: #108ee9
}
.siderStyle {
  height: 800px;
  min-width: 400px;
  text-align: left;
  font-size: 25px;
  line-height: 180px;
  color: #fff;
  backgroundC-color: #3ba0e9;
}
.footerStyle {
  text-align: center;
  color: #fff;
  backgroundC-color: #7dbcea;
}
.ant-menu {
  font-size: 15px;
}
</style>

