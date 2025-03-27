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
        <v-toolbar-title>档案分类</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="mb-2" color="primary" @click="insertClassify">新增按钮</v-btn>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="edit(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  <EditClassify />
</template>
<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import link from "@/api/Link.js";
import { useStore } from 'vuex';
import EditClassify from "@/components/EditClassify.vue";

const dialog = ref(false)
const dialogDelete = ref(false)
let store = useStore()
const headers = ref([
  {
    title: '分类编号',
    align: 'start',
    sortable: false,
    key: 'id',
  },
  { title: '分类名称:', key: 'classifyName' },
  { title: '创建用户:', key: 'createName' },
  { title: '创建时间:', key: 'createTime' },
  { title: '文献数量:', key: 'count' },
  { title: '操作:', key: 'actions', sortable: false },
])
const desserts = ref([])
const editedIndex = ref(-1)
const editedItem = ref({
  id: '',
  classifyName: '',
  createName: '',
  createTime: '',
  count: 0,
})
const defaultItem = ref({
  id: '',
  classifyName: '',
  createName: '',
  createTime: '',
  count: 0,
})
const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
})
function initialize () {
  link("/Classify/searchPage", 'POST',{
    'page': 0,
    'size': 50,
  }, {}, {}, ).then(response => {
    if (response.status === 200) {
      desserts.value = response.data.records
    }
  })
}
function edit(item) {
  store.commit('setEditClassifyComponent', item)
}
function insertClassify() {
  store.commit('setEditClassifyComponent', defaultItem.value)
}
function deleteItem (item) {
  editedIndex.value = desserts.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}
function deleteItemConfirm () {
  desserts.value.splice(editedIndex.value, 1)
  closeDelete()
}
function close () {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  })
}
function closeDelete () {
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  })
}
function save () {
  if (editedIndex.value > -1) {
    Object.assign(desserts.value[editedIndex.value], editedItem.value)
  } else {
    desserts.value.push(editedItem.value)
  }
  close()
}
watch(dialog, val => {
  val || close()
})
watch(dialogDelete, val => {
  val || closeDelete()
})
initialize()
</script>
