import { createI18n } from 'vue-i18n'
import { nextTick } from 'vue'
import { useStore } from 'vuex'
import preferences from '../store/modules/preferences'

const store = useStore()

export const SUPPORT_LOCALES = ['en', 'nl', 'de', 'es']
// console.log(JSON.parse(localStorage.getItem('preferences')))
export let CURRENT_LANGUAGE: string = 'en'

console.log(localStorage.getItem('preferences'))
if (localStorage.getItem('preferences') != null) {
    console.log('preferences null')
    const preferences = JSON.parse(localStorage.getItem('preferences'))
    if (preferences.language) {
        CURRENT_LANGUAGE = preferences.language
    } else {
        CURRENT_LANGUAGE = 'en'
    }
} else {
    console.log('preferences not nul')
    CURRENT_LANGUAGE = 'en'
}


// const currentLanguage = JSON.parse(localStorage.getItem('preferences')).language ?
//                         JSON.parse(localStorage.getItem('preferences')).language :
//                         'en'

// const currentLanguage = 'en'

export function setupI18n(options = { locale: 'nl' }) {
    const i18n = createI18n(options)
    setI18nLanguage(i18n, options.locale)
    return i18n
}

export function setI18nLanguage(i18n: any, locale: any) {
    if (i18n.mode === 'legacy') {
      i18n.global.locale = locale
    } else {
      i18n.global.locale.value = locale
    }
    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    // document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocaleMessages(i18n: any, locale: string) {
    // load locale messages with dynamic import
    const messages = await import(`../locales/${locale}.json`)
    console.log(messages.default)
  
    // set locale and locale message
    i18n.global.setLocaleMessage(locale, messages.default)
  
    return nextTick()
}

const i18n = setupI18n({
    locale: CURRENT_LANGUAGE,
    // locales: ['es', 'en', 'nl']
})


export default i18n;