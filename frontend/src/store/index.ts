import { createStore } from 'vuex'
import axios from 'axios'
import preferences from './modules/preferences'

const store = createStore({
  state: {
    favorites: [] as number[]
  },
  getters: {

  },

  actions: {},

  mutations: {
    initializeFavorites: (state: any): void => {
      if (localStorage.getItem('favorites')) {
          const localFavorites: number[] = JSON.parse(localStorage.getItem('favorites'))
          state.favorites = localFavorites
          localStorage.setItem('favorites', JSON.stringify(state.favorites))
      } else {
        localStorage.setItem('favorites', JSON.stringify([]))
      }
    },
    addRemoveFavorites: (state, id: any) => {
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((value) => { 
          return value != id;
        });
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
      } else {
        state.favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
      }
    }
  },

  modules: {
    preferences: preferences,
  },
})

export default store