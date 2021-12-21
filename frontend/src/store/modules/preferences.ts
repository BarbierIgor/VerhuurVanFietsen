import Preferences from "../../interfaces/Preferences"


const state: Preferences = {
    darkMode: true,
    language: 'en',
    units: 'metric',
}

const getters = {
    
}

const mutations = {
    initializePreferences: (state: Preferences): void => {
        console.log('init pref')
        if (localStorage.getItem('preferences')) {
            const localPreferences: Preferences = JSON.parse(localStorage.getItem('preferences'))
            state.darkMode = localPreferences.darkMode
            state.language = localPreferences.language
            state.units = localPreferences.units
        } else {
            localStorage.setItem('preferences', JSON.stringify(state))
        }
    },
    toggleDarkMode: (state: Preferences): void => {
        
        state.darkMode = !state.darkMode

        let localPreferences = JSON.parse(localStorage.getItem('preferences'))
        localPreferences.darkMode = state.darkMode
        localStorage.setItem('preferences', JSON.stringify(localPreferences))
    },
    updateUnits: (state: Preferences, unit: string): void => {
        console.log('Updating units')
        state.units = unit

        let localPreferences = JSON.parse(localStorage.getItem('preferences'))
        localPreferences.units = state.units
        localStorage.setItem('preferences', JSON.stringify(localPreferences))
    },
    updateLanguage: (state: Preferences, language: string): void => {
        console.log('Updating language')
        state.language = language

        let localPreferences = JSON.parse(localStorage.getItem('preferences'))
        localPreferences.language = state.language
        localStorage.setItem('preferences', JSON.stringify(localPreferences))
    },
}

export default {
    state,
    getters,
    mutations,
}