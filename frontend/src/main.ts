import { createApp, App as AppInterface } from 'vue'
import App from './App.vue'
import router from './bootstrap/router'
import './assets/style/screen.css'
import store from './store'
import VueQrcodeReader from 'vue3-qrcode-reader'

import useFireBase from './composables/useFirebase'

// const app = createApp(App)

// app.mount('#app')
;(async () => {
    const app: AppInterface = createApp(App)
    const { restoreAuth } = useFireBase()
    await restoreAuth()
    app.provide('$store', store)
    app.use(router)
    app.use(store)
    app.use(VueQrcodeReader)
    app.mount('#app')
})()
