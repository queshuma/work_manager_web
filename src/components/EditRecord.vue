<template v-slot:top>
  <v-dialog v-model="$store.state.editRecordComponentShow" max-width="60%" class="align-center justify-center">
    <v-card show class="borrow" >
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.recordName"
                label="文献名称:"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.establishName"
                label="建立人姓名"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.fileSource"
                label="数据来源"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.establishDate"
                label="建立时间"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.recordClassify"
                label="分类"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.createUserName"
                label="创建人"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-select
                v-model="editedItem.status"
                :items="statusOptions"
                :item-props="statusOptions"
                item-title="text"
                item-value="value"
                label="状态"
              ></v-select></v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="close"
        >
          取消
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="save"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useStore } from "vuex";
import { watch,ref } from "vue";
import link from "@/api/Link.js";

let store = useStore()

const editedItem = ref({
  recordName: '',
  recordClassify: '',
  fileSource: '',
  establishName: '',
  establishDate: '',
  createUserName: '',
  createDate: '',
  status: 0
})
const statusOptions= [
  { text: '在库', value: 0 },
  { text: '出库', value: 1 },
  { text: '进行中', value: 2 }
]
const formTitle = ref("编辑档案信息")

watch(() => store.state.editRecordInfo, (newValue) => {
  editedItem.value = newValue
  console.log("value")
  console.log(editedItem)
})

function save () {
  console.log(editedItem.value)
  link("/Record/saveRecord", 'POST',{
    'recordName': editedItem.value.recordName,
    'establishName': editedItem.value.establishName,
    'fileSource': editedItem.value.fileSource,
    'establishDate': editedItem.value.establishDate,
    'recordClassify': editedItem.value.recordClassify,
    'createDate': editedItem.value.createDate,
    'createUserName': editedItem.value.createUserName,
    'status': editedItem.value.status,
  }, {}, {} ).then(response => {
    if (response.status === 200) {
      alert("文献信息保存成功")
      store.commit('closeEditRecordComponent', null)
    }
  })
}

function close () {
  store.commit('closeEditRecordComponent', null)
  close()
}
</script>

<style scoped>

</style>
