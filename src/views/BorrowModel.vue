<template>
  <div class="model-title">
    <h3 class="h3-title">档案管理</h3>
    <div class="search">
      <a-input-search
          v-model:value="searchTitle"
          placeholder="根据名称查询"
          style="width: 200px"
          @search="searchRecord()"
      />
    </div>
  </div>
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
      <template  v-if="column.key === 'actions'">
        <div class="editable-row-operations">
        <span>
          <a @click="edit(text)">借阅</a>
        </span>
        </div>
      </template>
    </template>
  </a-table>
  <BorrowComponents />
</template>

<script setup>
import {ref} from "vue";
import link from "@/api/Link";
import store from "@/store/store";
import BorrowComponents from "@/components/Borrow/BorrowComponents.vue";

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
  {title: '操作:', key: 'actions'},
]);

const data = ref([]);
const searchTitle = ref("");

function edit(text) {
  store.commit('setBorrowRecordCom', text);
}

function searchRecord() {
  link("/Record/manager", 'POST', {
    'page': 0,
    'size': 50,
    'filterName': searchTitle.value,
    'filterClassify': '',
    'statusEnum': '0'
  }, {}, {},).then(response => {
    if (response.status === 200) {
      data.value = response.data.records;
      console.log(data)
    }
  })
}

function initialize() {
  searchRecord()
}
initialize()
</script>

<style scoped>

</style>