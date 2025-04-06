<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>档案资料出借名录</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="back(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        class="me-2"
        size="small"
        @click="viewDetails(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>
  <SubmitBack />
</template>
<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import link from "@/api/Link.js";
import SubmitBack from "@/components/SubmitBack.vue";
import { useStore } from 'vuex';

let store = useStore()
const dialog = ref(false)
const dialogDelete = ref(false)
const headers = ref([
  { title: '档案编号:', key: 'id' },
  {
    title: '档案名称:',
    align: 'start',
    sortable: false,
    key: 'recordName',
  },
  { title: '档案分类:', key: 'recordClassify' },
  { title: '数据来源:', key: 'fileSource' },
  { title: '档案创建人:', key: 'establishName' },
  { title: '创建时间:', key: 'establishDate' },
  { title: '档案备案人:', key: 'createUserName' },
  { title: '备案时间:', key: 'createDate' },
  { title: '操作:', key: 'actions', sortable: false },
])
const desserts = ref([])
const editedIndex = ref(-1)
const editedItem = ref({
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
})
const defaultItem = ref({
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
})
function initialize () {
  desserts.value = []
  link("/Record/manager", 'POST',{
    'page': 0,
    'size': 50,
    'filterName': '',
    'filterClassify': '',
    'statusEnum': '1',
  }, {}, {}, ).then(response => {
    if (response.status === 200) {
      desserts.value = response.data.records
    }
  })
}
function back (item) {
  link("/Record/borrowInfo", 'POST',{
    "id": item.id,
  }, {}, {} ).then(response => {
    if (response.status === 200) {
      item.createUserName = response.data.createUserName;
      item.departmentUserName = response.data.departmentUserName;
      item.department = response.data.department;
      item.departmentUserPhone = response.data.departmentUserPhone;
    }
  })
  store.commit('setSubmitBackComponent', item)
}
function viewDetails (item) {
  editedIndex.value = desserts.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}
initialize()
</script>
