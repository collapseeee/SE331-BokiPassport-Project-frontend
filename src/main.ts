import '@/assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { inject } from '@vercel/analytics'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

inject()
app.use(pinia)
app.use(router)

app.mount('#app')
