<template>
  <a-modal v-model:open="$store.state.editRecordComDisplay" cancel-text="取消" ok-text="入库" @ok="save()">
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
          name="id"
      >
        <a-input v-model:value="formInfo.id"/>
      </a-form-item>

      <a-form-item
          label="文献编号"
          name="recordId"
      >
        <a-input v-model:value="formInfo.recordId"/>
      </a-form-item>

      <a-form-item
          label="文献名称"
          name="recordName"
      >
        <a-input v-model:value="formInfo.recordName"/>
      </a-form-item>

      <a-form-item
          label="分类名称"
          name="recordClassify"
      >
        <a-input v-model:value="formInfo.recordClassify"/>
      </a-form-item>

      <a-form-item
          label="文献来源"
          name="fileSource"
      >
        <a-input v-model:value="formInfo.fileSource"/>
      </a-form-item>

      <a-form-item
          label="创建用户"
          name="establishName"
      >
        <a-input v-model:value="formInfo.establishName"/>
      </a-form-item>

      <a-form-item
          label="创建用户"
          name="establishDate"
      >
        <a-input v-model:value="formInfo.establishDate"/>
      </a-form-item>

      <a-form-item
          label="所属用户"
          name="createUserName"
      >
        <a-input v-model:value="formInfo.createUserName"/>
      </a-form-item>

      <a-form-item
          label="创建时间"
          name="createDate"
      >
        <a-input v-model:value="formInfo.createDate"/>
      </a-form-item>

      <a-form-item
          label="联系方式"
          name="status

"
      >
        <a-input v-model:value="formInfo.status"/>
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
const classifyOptions=ref([])

watch(() => store.state.editRecordComInfo, (newValue) => {
  formInfo.value = newValue;
  console.log(newValue);
  link("/Classify/list", 'GET',{
  }, {}, {} ).then(response => {
    if (response.status === 200) {
      classifyOptions.value = response.data
    }
  })
});

function save() {
  link("/Record/saveRecord", 'POST',{
    'recordName': formInfo.value.recordName,
    'establishName': formInfo.value.establishName,
    'fileSource': formInfo.value.fileSource,
    'establishDate': formInfo.value.establishDate,
    'recordClassify': formInfo.value.recordClassify,
    'createDate': formInfo.value.createDate,
    'createUserName': formInfo.value.createUserName,
    'status': formInfo.value.status,
  }, {}, {} ).then(response => {
    if (response.status === 200) {
      alert("文献信息保存成功")
      store.commit('closeEditRecordComponent', null)
    }
  })
}
</script>
<style scoped>

</style>