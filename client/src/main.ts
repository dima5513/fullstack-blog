import App from '@/App.vue'
import router from '@/router'
import { useMediaQuery } from '@vueuse/core'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './main.css'

const app = createApp(App)

const isMobile = useMediaQuery('(max-width: 767px)')
const isDesktop = useMediaQuery('(min-width: 768px)')
app.provide('isMobile', isMobile)
app.provide('isDesktop', isDesktop)
app.use(createPinia())
app.use(router)
app.mount('#app')
