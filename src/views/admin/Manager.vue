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
        <v-toolbar-title>档案资料管理</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

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
        @click="borrow(item)"
      >
        mdi-pencil
      </v-icon>
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
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  <editRecord />
  <submitRecord />
</template>
<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import link from "@/api/Link.js";
import { useStore } from 'vuex';
import editRecord from "@/components/EditRecord.vue";
import submitRecord from "@/components/SubmitBorrow.vue";

const dialog = ref(false)
const dialogDelete = ref(false)
const headers = ref([
  { title: '编号:', key: 'id' },
  { title: '档案编号:', key: 'recordId' },
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
  { title: '状态:', key: 'status' },
  { title: '操作:', key: 'actions', sortable: false },
])
const desserts = ref([])
const editedIndex = ref(-1)
const editedItem = ref({
  id: '',
  recordId: '',
  recordName: '',
  recordClassify: '',
  fileSource: '',
  establishName: '',
  establishDate: '',
  createUserName: '',
  createDate: '',
  status: '',
})
const defaultItem = ref({
  id: '',
  recordId: '',
  recordName: '',
  recordClassify: '',
  fileSource: '',
  establishName: '',
  establishDate: '',
  createUserName: '',
  createDate: '',
  status: '',
})

let store = useStore()
const formTitle = computed(() => {
  return editedIndex.value === -1 ? '新建档案信息' : '编辑档案信息'
})
function initialize () {
  desserts.value = []
  link("/Record/manager", 'POST',{
    'page': 0,
    'size': 50,
    'filterName': '',
    'filterClassify': ''
  }, {}, {}, ).then(response => {
    if (response.status === 200) {
      desserts.value = response.data.records
    }
  })
}
// 借阅
function borrow (item) {
  store.commit('setSubmitBorrowComponent', item)
}
// 编辑
function edit (item) {
  store.commit('setEditRecordComponent', item)
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
    // 编辑档案信息
    console.log(desserts.value[editedIndex.value], editedItem.value)
    Object.assign(desserts.value[editedIndex.value], editedItem.value)
  } else {
    console.log(editedItem.value)
    link("/Record/addRecord", 'POST',{
      'recordName': editedItem.value.recordName,
      'establishName': editedItem.value.establishName,
      'fileSource': editedItem.value.fileSource,
      'establishDate': editedItem.value.establishDate,
      'recordClassify': editedItem.value.recordClassify,
      'createDate': editedItem.value.createDate,
      'createUserName': editedItem.value.createUserName,
    }, {}, {} ).then(response => {
      if (response.status === 200) {
        desserts.value = response.data
      }
    })
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
