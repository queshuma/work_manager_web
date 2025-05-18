<template>
  <div class="model-title">
    <h3 class="h3-title">用户管理</h3>
  </div>
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
            <a-tag color="#87d068" v-if="status.text === '下线'">{{ status.text }}</a-tag>
            <a-tag color="#108ee9" v-else-if="status.text === '上线'">{{ status.text }}</a-tag>
            <a-tag color="#f50" v-else-if="status.text === '封禁'">{{ status.text }}</a-tag>
          </template>
        </div>
      </template>
      <template  v-if="column.key === 'actions'">
        <div class="editable-row-operations">
        <span>
          <a @click="editStatus(text)">状态调整</a>
        </span>
        </div>
      </template>
    </template>
  </a-table>
  <EditUserStatusComponents />
</template>

<script setup>
import { ref } from "vue";
import link from "@/api/Link";
import store from "@/store/store";
import EditUserStatusComponents from "@/components/User/EditUserStatusComponents.vue";

const columns = ref([
  { title: '编号:', key: 'id', },
  { title: '用户名:', key: 'username' },
  { title: '创建时间:', key: 'createTime' },
  { title: '地址:', key: 'address' },
  { title: '角色:', key: 'role' },
  { title: '当前状态:', key: 'status' },
  { title: '操作:', key: 'actions' },
]);

const statusOptions= [
  { text: '下线', value: 0 },
  { text: '上线', value: 1 },
  { text: '删除', value: 2 }
]

const data = ref([]);

function editStatus(record) {
  store.commit('setEditUserStatusCom', record);
}

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