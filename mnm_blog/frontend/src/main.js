import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Router import edilmiş mi?
import './style.css' 

const app = createApp(App)

app.use(router)  // Router kullanılıyor mu?
app.mount('#app')