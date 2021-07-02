import Vue from 'vue'
import Vuex from 'vuex'
import { MUTATION } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'PESTLE ANALYSIS INDIA',
    children: [
      {
        title: 'POLITICAL FACTORS',
        children: [],
        backgroundColor: '#04CE86'
      },
      {
        title: 'ECONOMIC FACTORS',
        children: [],
        backgroundColor: '#C436FF'
      },
      {
        title: 'SOCIAL FACTORS',
        children: [],
        backgroundColor: '#244EFF'
      },
      {
        title: 'TECHNOLOGICAL FACTORS',
        children: [],
        backgroundColor: '#742DA9'
      },
      {
        title: 'LEGAL FACTORS',
        children: [],
        backgroundColor: '#8ED246'
      },
      {
        title: 'ENVIRONMENTAL FACTORS',
        children: [],
        backgroundColor: '#FF314A'
      }
    ]
  },
  mutations: {
    [MUTATION.SET_ELEMENT_TO_STORE] (state, title) {
      const element = {
        title,
        children: []
      }
      state.children.push(element)
    },
    [MUTATION.REMOVE_ELEMENT_FROM_STORE] (state, index) {
      state.children.splice(index, 1)
    },
    [MUTATION.SET_TITLE_TO_STORE] (state, title) {
      state.title = title
    },
    [MUTATION.SET_CHILDREN_TO_STORE] (state, children) {
      state.children = children
    }
  },
  getters: {
    title: state => {
      return state.title
    },
    children: state => {
      return state.children
    }
  }
})
