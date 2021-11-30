import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    items: []
  },
  getters: {
    items: (state) => {
      state.items
    },
  },

  actions: {
    loadItems({ commit }) {
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
      .then(response => response.data)
      .then(items => {
        console.log(items);
        commit('SET_ITEM', items)
      })
    }
  },

  mutations: {
    SET_ITEM(state, items) {
      state.items = items
    }
  },
  modules: {},
})

export default store