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
    borrowRecordComDisplay: false,
    borrowRecordComInfo: {},
    editBackComponentShow: false,
    editBackInfo: {},
    editClassifyComDisplay: false,
    editClassifyComInfo: {},
    editUserStatusComDisplay: false,
    editUserStatusComInfo: {},
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
    setBorrowRecordCom(state, paylog) {
      state.borrowRecordComDisplay = !state.borrowRecordComDisplay
      state.borrowRecordComInfo = paylog
    },
    setBorrowRecordComDisplay(state) {
      state.borrowRecordComDisplay = !state.borrowRecordComDisplay
    },
    setEditClassifyCom(state, paylog) {
      state.editClassifyComDisplay = !state.editClassifyComDisplay
      state.editClassifyComInfo = paylog
    },
    closeEditClassifyDisplay(state) {
      state.editClassifyComDisplay = !state.editClassifyComDisplay
    },
    setEditUserStatusCom(state, paylog) {
      state.editUserStatusComDisplay = !state.editClassifyComDisplay
      state.editUserStatusComInfo = paylog
    },
    setEditUserStatusComDisplay(state) {
      state.editUserStatusComDisplay = !state.editUserStatusComDisplay
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
