import { createApp } from 'vue'
import App from './App.vue'
import Oruga from '@oruga-ui/oruga-next'
import { bulmaConfig } from '@oruga-ui/theme-bulma'
import '@oruga-ui/theme-bulma/style.css'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

app.use(Oruga, bulmaConfig)

app.mount('#app')
