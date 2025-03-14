
import Vuex from 'vuex'
import { createStore } from 'vuex'

export default createStore({
  state: {
    // 在这里定义控制组件显示的状态，例如：
    showComponent: false,
    parms: null
  },
  mutations: {
    // 在这里定义修改状态的方法，例如：
    setShowComponent(state, value) {
      state.showComponent = !state.showComponent
      state.params = value
    }
  },
  actions: {
    // 在这里定义触发mutations的方法，例如：
    toggleShowComponent({ commit }) {
      commit('setShowComponent',!state.showComponent)
    }
  },
  getters: {
    // 在这里定义基于state的计算属性，例如：
    isComponentShown(state) {
      return state.showComponent
    }
  }
})
