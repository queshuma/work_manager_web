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
        <v-toolbar-title>用户管理</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
        </v-dialog>

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
    <template v-slot:item.status="{ item }">
      <v-chip
        :border="`${getColor(item.status)} thin opacity-25`"
        :color="getColor(item.status)"
        :text="getItemText(item.status)"
        size="x-small"
        @click=updateStatus(item)
      ></v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="history(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        class="me-2"
        size="small"
        @click="borrow(item)"
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
</template>
<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import link from "@/api/Link.js";

const dialog = ref(false)
const dialogDelete = ref(false)
const headers = ref([
  {
    title: '编号:',
    align: 'start',
    sortable: false,
    key: 'id',
  },
  { title: '用户名:', key: 'username' },
  { title: '创建时间:', key: 'createTime' },
  { title: '地址:', key: 'address' },
  { title: '角色:', key: 'role' },
  { title: '当前状态:', key: 'status' },
])
const desserts = ref([])
const editedIndex = ref(-1)
const editedItem = ref({
  id: '',
  username: 0,
  createTime: 0,
  address: 0,
  role: 0,
  status: 0,
})
const defaultItem = ref({
  id: '',
  username: 0,
  createTime: 0,
  address: 0,
  role: 0,
  status: 0,
})
const statusOptions= [
  { text: '下线', value: 0 },
  { text: '上线', value: 1 },
  { text: '删除', value: 2 }
]
function initialize () {
  link("/User/page", 'POST',{}, {
    'page': 0,
    'size': 50,
  }, {}, true).then(response => {
    if (response.status === 200) {
      desserts.value = response.data.records
    }
  })
  desserts.value = [
  ]
}
function history (item) {
  editedIndex.value = desserts.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}
function borrow (item) {
  editedIndex.value = desserts.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
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
function getColor (status) {
  console.log(status)
  if (status === 0) return 'error'
  else if(status === 1) return  'info'
  else if (status === 2) return 'warning'
  else return 'success'
}
function getItemText (status) {
  for (let statusOption of statusOptions) {
    if(statusOption.value === status) {
      console.log(statusOption.text)
      return statusOption.text
    }
  }
}
function updateStatus (item) {
  link("/User/updateStatus", 'GET',{}, {'userId': item.id}, {}, ).then(response => {
    if (response.status === 200) {
      alert("请刷新页面,查看最新数据")
      window.location.reload();
    }
  })
}
initialize()
</script>
