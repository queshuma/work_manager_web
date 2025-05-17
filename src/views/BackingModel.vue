<template>
  <div class="model-title">
    <h3 class="h3-title">档案归还</h3>
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
      <template v-if="column.key === 'establishDate'">
        <a>{{ text.establishDate }}</a>
      </template>
      <template v-if="column.key === 'createUserName'">
        <a>{{ text.createUserName }}</a>
      </template>
      <template v-if="column.key === 'createDate'">
        <a>{{ text.createDate }}</a>
      </template>
      <template  v-if="column.key === 'actions'">
        <div class="editable-row-operations">
        <span>
          <a @click="back(text)">入库</a>
        </span>
        </div>
      </template>
    </template>
  </a-table>
  <BackingComponents />
</template>

<script setup>
import {ref} from "vue";
import link from "@/api/Link";
import BackingComponents from "@/components/Backing/BackingComponents.vue";
import store from "@/store/store";

const columns = ref([
  { title: '档案编号:', key: 'id' },
  { title: '档案名称:', key: 'recordName' },
  { title: '档案分类:', key: 'recordClassify' },
  { title: '数据来源:', key: 'fileSource' },
  { title: '整理用户:', key: 'establishName' },
  { title: '整理时间:', key: 'establishDate' },
  { title: '创建用户:', key: 'createUserName' },
  { title: '创建时间:', key: 'createDate' },
  { title: '操作:', key: 'actions', sortable: false }
]);

const data = ref([]);
const searchTitle = ref("");

function back(text) {
  console.log(text);
  store.commit('setBackRecordCom', text)
}

function searchRecord() {
  link("/Record/manager", 'POST',{
    'page': 0,
    'size': 50,
    'filterName': searchTitle.value,
    'filterClassify': '',
    'statusEnum': '1',
  }, {}, {}, ).then(response => {
    if (response.status === 200) {
      data.value = response.data.records
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