import {tr} from "vuetify/locale";

const HomeModule = {
  state: {
    //用户信息修改框显示
    borrowCreateVisible: false,
  },
  mutations: {
    // 档案借阅
    SET_BORROW_CREATE(state, paylog) {
      console.log(state.borrowCreateVisible);
      state.borrowCreateVisible = !state.borrowCreateVisible
      state.borrowCreateVisible = paylog
    },
    // //修改商品信息
    // SET_OBJECTDIT(state, paylog) {
    //   state.objectEditVisible = !state.objectEditVisible
    //   state.currentObjectInfo = paylog
    // },
    // //设置弹出框是否显示
    // DIALOG(state) {
    //   // state.objectEditVisible = !state.objectEditVisible
    //   // window.location.reload()
    // },
  },
  actions: {

  },
  getters: {

  }
}

export default HomeModule
