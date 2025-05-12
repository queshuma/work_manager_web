import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    // 在这里定义控制组件显示的状态，例如：
    submitBorrowComponentShow: false,
    borrowInfo: {},
    backRecordComDisplay: false,
    backRecordComInfo: {},
    editRecordComDisplay: false,
    editRecordComInfo: {},
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
    setBackRecordCom(state, paylog) {
      state.backRecordComDisplay = !state.backRecordComDisplay
      state.backRecordComInfo = paylog
    },
    setBackRecordComDisplay(state) {
      state.backRecordComDisplay = !state.backRecordComDisplay
    },
    setEditRecordCom(state, paylog) {
      state.editRecordComDisplay = !state.editRecordComDisplay
      state.editRecordComInfo = paylog
    },
    setEditRecordComDisplay(state) {
      state.editRecordComDisplay = !state.editRecordComDisplay
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
    //   commit('setEditRecordComponent', !state.backRecordComDisplay)
    // }
    // toggleShowComponent({ commit }) {
    //   commit('setEditRecordComponent', !state.backRecordComDisplay)
    // }
  },
  getters: {
    // 在这里定义基于state的计算属性，例如：
    // isComponentShown(state) {
    //   return state.backRecordComDisplay
    // }
  }
})

export default store
