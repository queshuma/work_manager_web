<template>
  <a-modal v-model:open="$store.state.editClassifyComDisplay" cancel-text="取消" ok-text="入库" @ok="save()">
    <h2>文献分类</h2>
    <a-form
        :label-col="{ span: 8 }"
        :model="formInfo"
        :wrapper-col="{ span: 16 }"
        autocomplete="on"
        name="basic"
    >
      <a-form-item
          label="分类编号"
          name="id"
          v-if="formInfo.classifyName != null"
      >
        <a-input v-model:value="formInfo.id" disabled/>
      </a-form-item>

      <a-form-item
          label="分类名称"
          name="recordId"
      >
        <a-input v-model:value="formInfo.classifyName"/>
      </a-form-item>

      <a-form-item
          label="创建用户"
          name="recordName"
          v-if="formInfo.classifyName != null"
      >
        <a-input v-model:value="formInfo.createName" disabled/>
      </a-form-item>

      <a-form-item
          label="创建时间"
          name="createTime"
          v-if="formInfo.classifyName != null"
      >
        <a-input v-model:value="formInfo.createTime" disabled/>
      </a-form-item>

      <a-form-item
          label="文献数量"
          name="recordClassify"
          v-if="formInfo.classifyName != null"
      >
        <a-input v-model:value="formInfo.count" disabled/>
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
const defaultFormInfo = ({
  id: '',
  classifyName: '',
  createName: '',
  createTime: '',
  count: 0,
})

watch(() => store.state.editClassifyComInfo, (newValue) => {
  if (newValue == null) {
    formInfo.value = defaultFormInfo;
  } else {
    formInfo.value = newValue;
  }
  link("/Classify/list", 'GET',{}, {}, {} ).then(response => {
    if (response.status === 200) {
      classifyOptions.value = response.data
    }
  })
});

function save() {
  link("/Classify/save", 'POST',{
    'id': formInfo.value.id,
    'classifyName': formInfo.value.classifyName,
  }, {}, {} ).then(response => {
    if (response.status === 200) {
      alert("文献分类信息保存成功")
    }
  })
  store.commit('closeEditClassifyDisplay');
}
</script>
<style scoped>

</style>