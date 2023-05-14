/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

if (import.meta.env.VITE_ENV === 'development') {
  app.config.devtools = true
}

app.config.globalProperties.$localStorage = window.localStorage

registerPlugins(app)

import store from './store'
app.use(store)
import router from './router'
app.use(router)

app.mount('#app')
