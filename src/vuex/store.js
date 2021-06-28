import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'PESTLE ANALYSIS INDIA',
    children: []
  },
  mutations: {
    SET_ELEMENT_TO_STORE (state, title) {
      const element = {
        title,
        children: []
      }
      state.children.push(element)
    },
    REMOVE_ELEMENT_FROM_STORE (state, index) {
      state.children.splice(index, 1)
    },
    SET_TITLE_TO_STORE (state, title) {
      state.title = title
    },
    SET_ITEMS_TO_STORE (state, items) {
      state.children = items
    }
  },
  getters: {
    TITLE: state => {
      return state.title
    },
    CHILDREN: state => {
      return state.children
    }
  }
})
