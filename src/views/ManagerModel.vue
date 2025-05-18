<template>
  <div class="model-title">
    <h3 class="h3-title">档案管理</h3>
  </div>
  <div class="search">
    <a-button type="dashed" @click="insertRecord()">添加文献</a-button>
    <a-input-search
        v-model:value="searchTitle"
        placeholder="根据名称查询"
        style="width: 200px"
        @search="searchRecord()"
    />
  </div>
  <a-table :columns="columns" :data-source="data" :pagination="pagination"
           @change="handleTableChange" bordered >
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
        <a-tag color="green" v-if="text.status === 0">在库</a-tag>
        <a-tag color="cyan" v-if="text.status === 1">出库</a-tag>
        <a-tag color="red" v-if="text.status === 2">已删除</a-tag>
      </template>
      <template  v-if="column.key === 'actions'">
        <div class="editable-row-operations">
        <span>
          <a @click="edit(text)">编辑</a>
        </span>
        </div>
        <div class="editable-row-operations" v-if="text.status === 1">
        <span>
          <a @click="remove(text)">删除</a>
        </span>
        </div>
      </template>
    </template>
  </a-table>
  <EditRecordComponents />
</template>

<script setup>
import { ref } from "vue";
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
  {title: '整理用户:', key: 'establishName'},
  {title: '整理时间:', key: 'establishDate'},
  {title: '创建用户:', key: 'createUserName'},
  {title: '创建时间:', key: 'createDate'},
  {title: '状态:', key: 'status'},
  {title: '操作:', key: 'actions'},
]);

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
});

const data = ref([]);
const searchTitle = ref("");


function edit(text) {
  store.commit('setEditRecordCom', text);
}

function insertRecord() {
  store.commit('setEditRecordCom', null);
}

function remove(infoForm) {
  link("/Record/removeById", 'Get', {}, {
    id: infoForm.id
  }, {},).then(response => {
    if (response.status === 200) {
      data.value = response.data.records;
      console.log(data)
    }
  })
}

function searchRecord() {
  link("/Record/manager", 'POST', {
    'page': pagination.value.current,
    'size': pagination.value.pageSize,
    'filterName': searchTitle.value,
    'filterClassify': ''
  }, {}, {},).then(response => {
    if (response.status === 200) {
      data.value = response.data.records;
      console.log(data)
    }
  })
}

const handleTableChange = (paginator) => {
  Object.assign(pagination.value, paginator); // 合并分页参数
  console.log(paginator);
  searchRecord();
};


function initialize() {
  searchRecord()
}
initialize()
</script>

<style scoped>

</style>