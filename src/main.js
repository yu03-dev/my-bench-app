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
import store from './store'

const app = createApp(App)
app.config.devtools = true
app.config.globalProperties.$localStorage = window.localStorage

registerPlugins(app)
app.use(store)

app.mount('#app')
