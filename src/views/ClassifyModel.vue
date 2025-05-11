<template>
  <div>档案分类</div>
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
          <a @click="edit(record.key)">编辑</a>
        </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import {ref} from "vue";
import link from "@/api/Link";

const columns = ref([
  { title: '分类编号', key: 'id' },
  { title: '分类名称:', key: 'classifyName' },
  { title: '创建用户:', key: 'createName' },
  { title: '创建时间:', key: 'createTime' },
  { title: '文献数量:', key: 'count' },
  { title: '操作:', key: 'actions', sortable: false },
]);

const data = ref([]);

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