import { createApp } from 'vue'
import { router } from '@/router'

import App from './App.vue'
import '@/assets/styles/main.css'

const app = createApp(App)

app.use(router)
await router.isReady()

app.mount('#app')
