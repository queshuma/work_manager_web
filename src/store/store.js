
import Vuex from 'vuex'
import { createStore } from 'vuex'

export default createStore({
  state: {
    // 在这里定义控制组件显示的状态，例如：
    borrowComponentShow: false,
    borrowInfo: {}
  },
  mutations: {
    // 在这里定义修改状态的方法，例如：
    setBorrowComponent(state, paylog) {
      state.borrowComponentShow = !state.borrowComponentShow
      state.borrowInfo = paylog
    },
    closeBorrowComponent(state) {
      state.borrowComponentShow = !state.borrowComponentShow
    }
  },
  actions: {
    // 在这里定义触发mutations的方法，例如：
    toggleShowComponent({ commit }) {
      commit('setBorrowComponent',!state.borrowComponentShow)
    }
  },
  getters: {
    // 在这里定义基于state的计算属性，例如：
    isComponentShown(state) {
      return state.borrowComponentShow
    }
  }
})
