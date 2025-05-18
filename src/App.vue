<template>
<!--  <a-config-provider :getPopupContainer="getPopupContainer">-->
  <a-config-provider :locale="zhCN">
    <div>
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script setup>
import { RouterView } from "vue-router";

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 加载中文语言包

dayjs.locale('zh-cn') // 全局设置中文
</script>

<style>
#app {
  .model-title {
  }
  .h3-title {
    text-align: left;
    line-height: 60px;
    font-size: 20px;
    padding: 0 60px;
    background-color: #7dbcea;
  }
  .search {
    display: block;
    width: 100%;
    height: auto;
    padding: 0 110px 40px 0;
  }
  .search .ant-btn {
    float: right;
  }
  .search .ant-input-search {
    float: right;
    padding: 0 15px;
  }
}
</style>