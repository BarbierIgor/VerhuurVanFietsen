import { createApp, App as AppInterface } from 'vue'
import App from './App.vue'
import router from './bootstrap/router'
import './assets/style/screen.css'
import store from './store'
import VueQrcodeReader from 'vue3-qrcode-reader'

// import { provideI18n } from './plugins/i18n'

// import { setupI18n } from './plugins/i18n-setup'
import i18n, { setupI18n } from './plugins/i18n-setup'

import useFireBase from './composables/useFirebase'

;(async () => {


    const app: AppInterface = createApp(App)
    const { restoreAuth } = useFireBase()
    await restoreAuth()
    app.provide('$store', store)
    app.use(i18n)
    // app.use(setupI18n)
    app.use(router)
    app.use(store)
    app.use(VueQrcodeReader)
    app.mount('#app')
})()
