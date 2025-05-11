import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import Antd from 'ant-design-vue';
import Vuex from 'vuex';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(Vuex)
app.mount('#app')