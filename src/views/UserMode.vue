<template>
  <div>用户管理</div>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.key === 'id'">
        <a>{{ text.id }}</a>
      </template>
      <template v-if="column.key === 'username'">
        <a>{{ text.username }}</a>
      </template>
      <template v-if="column.key === 'createTime'">
        <a>{{ text.createTime }}</a>
      </template>
      <template v-if="column.key === 'address'">
        <a>{{ text.address }}</a>
      </template>
      <template v-if="column.key === 'role'">
        <a>{{ text.role }}</a>
      </template>
      <template v-if="column.key === 'status'">
        <div v-for="status in statusOptions" :key="status.value">
          <template v-if="text.status === status.value" >
            {{ status.text }}
          </template>
        </div>
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
  { title: '编号:', key: 'id', },
  { title: '用户名:', key: 'username' },
  { title: '创建时间:', key: 'createTime' },
  { title: '地址:', key: 'address' },
  { title: '角色:', key: 'role' },
  { title: '当前状态:', key: 'status' },
]);

const statusOptions= [
  { text: '下线', value: 0 },
  { text: '上线', value: 1 },
  { text: '删除', value: 2 }
]

const data = ref([]);

function initialize() {
  link("/User/page", 'POST',{
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