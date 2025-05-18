<template>
  <a-modal v-model:open="$store.state.editUserStatusComDisplay" cancel-text="取消" ok-text="入库" @ok="save()">
    <h2>账号状态</h2>
    <a-form
        :label-col="{ span: 8 }"
        :model="formInfo"
        :wrapper-col="{ span: 16 }"
        autocomplete="on"
        name="basic"
    >
      <a-form-item
          label="编号"
          name="id"
          v-if="formInfo.id != null"
      >
        <a-input v-model:value="formInfo.id" disabled/>
      </a-form-item>

      <a-form-item
          label="用户名称"
          name="username"
      >
        <a-input v-model:value="formInfo.username" disabled/>
      </a-form-item>

      <a-form-item
          label="角色"
          name="role"
      >
        <a-input v-model:value="formInfo.role"/>
      </a-form-item>

      <a-form-item
          label="状态"
          name="status"
      >
        <a-select v-model:value="formInfo.status" placeholder="请选择状态">
          <a-select-option
              v-for="item in statusOptions"
              :key="item.value"
              :value="item.value"
          >
            {{ item.text }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
          label="地址"
          name="address"
      >
        <a-input v-model:value="formInfo.address"/>
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

const statusOptions= [
  { text: '下线', value: 0 },
  { text: '上线', value: 1 },
  { text: '删除', value: 2 }
]



watch(() => store.state.editUserStatusComInfo, (newValue) => {
  formInfo.value = newValue;
});

function save() {
  // TODO

  // link("/Record/saveRecord", 'POST',{
  //
  //   'status': formInfo.value.status,
  // }, {}, {} ).then(response => {
  //   if (response.status === 200) {
  //     alert("用户信息保存成功")
  //     store.commit('closeEditRecordComponent', null)
  //   }
  // })
}
</script>
<style scoped>

</style>