
import Vuex from 'vuex'
import { createStore } from 'vuex'

export default createStore({
  state: {
    // 在这里定义控制组件显示的状态，例如：
    submitBorrowComponentShow: false,
    borrowInfo: {},
    editRecordComponentShow: false,
    editRecordInfo: {},
    editBackComponentShow: false,
    editBackInfo: {},
    editClassifyComponentShow: false,
    editClassifyInfo: {}
  },
  mutations: {
    // 在这里定义修改状态的方法，例如：
    setSubmitBorrowComponent(state, paylog) {
      state.submitBorrowComponentShow = !state.submitBorrowComponentShow
      state.borrowInfo = paylog
    },
    closeSubmitBorrowComponent(state) {
      state.submitBorrowComponentShow = !state.submitBorrowComponentShow
    },
    setSubmitBackComponent(state, paylog) {
      state.submitBackComponentShow = !state.submitBackComponentShow
      state.editBackInfo = paylog
    },
    closeSubmitBackComponent(state) {
      state.submitBackComponentShow = !state.submitBackComponentShow
    },
    setEditRecordComponent(state, paylog) {
      state.editRecordComponentShow = !state.editRecordComponentShow
      state.editRecordInfo = paylog
    },
    closeEditRecordComponent(state) {
      state.editRecordComponentShow = !state.editRecordComponentShow
    },
    setEditClassifyComponent(state, paylog) {
      state.editClassifyComponentShow = !state.editClassifyComponentShow
      state.editClassifyInfo = paylog
    },
    closeEditClassifyComponent(state) {
      state.editClassifyComponentShow = !state.editClassifyComponentShow
    },
  },
  actions: {
    // 在这里定义触发mutations的方法，例如：
    // toggleShowComponent({ commit }) {
    //   commit('setEditRecordComponent', !state.editRecordComponentShow)
    // }
    // toggleShowComponent({ commit }) {
    //   commit('setEditRecordComponent', !state.editRecordComponentShow)
    // }
  },
  getters: {
    // 在这里定义基于state的计算属性，例如：
    // isComponentShown(state) {
    //   return state.editRecordComponentShow
    // }
  }
})
