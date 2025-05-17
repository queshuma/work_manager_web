<template>
  <div class="model-title">
    <h3 class="h3-title">文献分类</h3>
  </div>
  <div class="search">
    <a-button type="dashed" @click="insertRecord()">添加分类</a-button>
    <a-input-search
        v-model:value="searchTitle"
        placeholder="根据名称查询"
        style="width: 200px"
        @search="searchRecord()"
    />
  </div>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.key === 'id'">
        <a>{{ text.id }}</a>
      </template>
      <template v-if="column.key === 'classifyName'">
        <a>{{ text.classifyName }}</a>
      </template>
      <template v-if="column.key === 'createName'">
        <a>{{ text.createName }}</a>
      </template>
      <template v-if="column.key === 'createTime'">
        <a>{{ text.createTime }}</a>
      </template>
      <template v-if="column.key === 'count'">
        <a>{{ text.count }}</a>
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
  <EditClassifyComponents />
</template>

<script setup>
import {ref} from "vue";
import link from "@/api/Link";
import store from "@/store/store";
import EditClassifyComponents from "@/components/Classify/EditClassifyComponents.vue";

const columns = ref([
  { title: '分类编号', key: 'id' },
  { title: '分类名称:', key: 'classifyName' },
  { title: '创建用户:', key: 'createName' },
  { title: '创建时间:', key: 'createTime' },
  { title: '文献数量:', key: 'count' },
  { title: '操作:', key: 'actions', sortable: false },
]);

const data = ref([]);

function edit(text) {
  store.commit('setEditClassifyCom', text);
}

function insertRecord() {
  store.commit('setEditClassifyCom', null);
}

function initialize() {
  link("/Classify/searchPage", 'POST',{
    'page': 0,
    'size': 50,
    'filterName': '',
    'filterClassify': '',
    'statusEnum': '1',
  }, {}, {}, ).then(response => {
    if (response.status === 200) {
      data.value = response.data.records
    }
  })
}
initialize()
</script>

<style scoped>

</style>