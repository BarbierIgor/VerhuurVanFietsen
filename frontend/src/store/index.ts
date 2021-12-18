import { createStore } from 'vuex'
import axios from 'axios'
import preferences from './modules/preferences'

const store = createStore({
  state: {
  },
  getters: {
  },

  actions: {},

  mutations: {},

  modules: {
    preferences: preferences,
  },
})

export default store