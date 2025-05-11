<template>
  <a-modal v-model:open="$store.state.backRecordComDisplay" cancel-text="取消" ok-text="入库" @ok="backRecord()">
    <h2>文献入库</h2>
    <a-form
        :label-col="{ span: 8 }"
        :model="formInfo"
        :wrapper-col="{ span: 16 }"
        autocomplete="on"
        name="basic"
    >
      <a-form-item
          label="文献编号"
          name="recordId"
      >
        <a-input v-model:value="formInfo.recordId" disabled/>
      </a-form-item>

      <a-form-item
          label="文献名称"
          name="recordName"
      >
        <a-input v-model:value="formInfo.recordName" disabled/>
      </a-form-item>

      <a-form-item
          label="分类名称"
          name="recordClassify"
      >
        <a-input v-model:value="formInfo.recordClassify" disabled/>
      </a-form-item>

      <a-form-item
          label="所属部门"
          name="department"
      >
        <a-input v-model:value="formInfo.department" disabled/>
      </a-form-item>

      <a-form-item
          label="创建名称"
          name="createUserName"
      >
        <a-input v-model:value="formInfo.createUserName" disabled/>
      </a-form-item>

      <a-form-item
          label="借阅人员"
          name="departmentUserName"
      >
        <a-input v-model:value="formInfo.departmentUserName" disabled/>
      </a-form-item>

      <a-form-item
          label="联系方式"
          name="departmentUserPhone"
      >
        <a-input v-model:value="formInfo.departmentUserPhone" disabled/>
      </a-form-item>

    </a-form>
  </a-modal>
</template>
<script setup>
import $store from "@/store/store";

import {ref} from 'vue';
import {watch} from "vue";
import store from "@/store/store";
import link from "@/api/Link";

const formInfo = ref({})

watch(() => store.state.backRecordComInfo, (newValue) => {
  console.log(newValue);
  formInfo.value = newValue;
});

function backRecord() {
  link("/Record/back", 'POST',{
    "recordId": formInfo.value.recordId,
  }, {}, {} ).then(response => {
    if (response.status === 200) {
      alert("文献归还成功")
      store.commit('closeSubmitBackComponent', null)
      location.reload();
    }
  })
}
</script>
<style scoped>

</style>