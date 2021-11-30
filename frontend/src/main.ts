import { createApp } from 'vue'
import App from './App.vue'
import router from './bootstrap/router'
import './assets/style/screen.css'
import store from './store'
import VueQrcodeReader from 'vue3-qrcode-reader';

const app = createApp(App)
app.provide("$store", store);
app.use(router)
app.use(store)
app.use(VueQrcodeReader)
app.mount('#app')
