<template>
    <router-view></router-view>
</template>

<style></style>
<script lang="ts">
import 'animate.css'
import data from './utils/data.json'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import i18n, { CURRENT_LANGUAGE, loadLocaleMessages } from './plugins/i18n-setup'
import axios from 'axios'
// import { provideI18n } from './plugins/i18n'
export default defineComponent({
    name: 'App',

    setup() {
        // let currentLanguage: string
        // if (localStorage.getItem('preferences') != null) {
        //     console.log('preferences null')
        //     const preferences = JSON.parse(localStorage.getItem('preferences'))
        //     if (preferences.language) {
        //         currentLanguage = preferences.language
        //     } else {
        //         currentLanguage = 'en'
        //     }
        // } else {
        //     console.log('preferences not nul')
        //     currentLanguage = 'en'
        // }


        // const preferences = JSON.parse(localStorage.preferences)
        loadLocaleMessages(i18n, CURRENT_LANGUAGE)
        // if (preferences.language) {
        // } else {
        //     // loadLocaleMessages(i18n, 'en')
        // }
    },

    beforeCreate() {
        const store = useStore()
        store.commit('initializePreferences')
        store.commit('initializeFavorites')
    },
})
</script>
