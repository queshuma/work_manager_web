<template>
  <div>档案管理</div>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.key === 'id'">
        <a>{{ text.id }}</a>
      </template>
      <template v-if="column.key === 'recordId'">
        <a>{{ text.recordId }}</a>
      </template>
      <template v-if="column.key === 'recordName'">
        <a>{{ text.recordName }}</a>
      </template>
      <template v-if="column.key === 'recordClassify'">
        <a>{{ text.recordClassify }}</a>
      </template>
      <template v-if="column.key === 'fileSource'">
        <a>{{ text.fileSource }}</a>
      </template>
      <template v-if="column.key === 'establishName'">
        <a>{{ text.establishName }}</a>
      </template>
      <template v-if="column.key === 'establishDate'">
        <a>{{ text.establishDate }}</a>
      </template>
      <template v-if="column.key === 'createUserName'">
        <a>{{ text.createUserName }}</a>
      </template>
      <template v-if="column.key === 'createDate'">
        <a>{{ text.createDate }}</a>
      </template>
      <template v-if="column.key === 'status'">
        <a>{{ text.status }}</a>
      </template>
      <template  v-if="column.key === 'actions'">
        <div class="editable-row-operations">
        <span>
          <a @click="edit(text)">编辑</a>
        </span>
        </div>
      </template>
    </template>
  </a-table>
  <EditRecordComponents />
</template>

<script setup>
import {ref} from "vue";
import link from "@/api/Link";
import EditRecordComponents from "@/components/Manage/EditRecordComponents.vue";
import store from "@/store/store";

const columns = ref([
  {title: '编号:', key: 'id'},
  {title: '档案编号:', key: 'recordId'},
  {
    title: '档案名称:',
    align: 'start',
    sortable: false,
    key: 'recordName',
  },
  {title: '档案分类:', key: 'recordClassify'},
  {title: '数据来源:', key: 'fileSource'},
  {title: '档案创建人:', key: 'establishName'},
  {title: '创建时间:', key: 'establishDate'},
  {title: '档案备案人:', key: 'createUserName'},
  {title: '备案时间:', key: 'createDate'},
  {title: '状态:', key: 'status'},
  {title: '操作:', key: 'actions'},
]);

const data = ref([]);

function edit(text) {
  store.commit('setEditRecordCom', text);
}

function initialize() {
  link("/Record/manager", 'POST', {
    'page': 0,
    'size': 50,
    'filterName': '',
    'filterClassify': ''
  }, {}, {},).then(response => {
    if (response.status === 200) {
      data.value = response.data.records;
      console.log(data)
    }
  })
}
initialize()
</script>

<style scoped>

</style>