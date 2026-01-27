import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Router import edilmiş mi?

const app = createApp(App)

app.use(router)  // Router kullanılıyor mu?
app.mount('#app')