/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import router from "@/router/index.js";
import store from "./store/store.js"

const app = createApp(App)

app.use(router)
app.use(store)
registerPlugins(app)
app.mount('#app')
