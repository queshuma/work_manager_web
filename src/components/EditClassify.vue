<template v-slot:top>
  <v-dialog v-model="$store.state.editClassifyComponentShow" max-width="60%" class="align-center justify-center">
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
                v-model="editedItem.id"
                label="分类编号:"
                disabled
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.classifyName"
                label="分类名称"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.createName"
                label="创建用户"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.createTime"
                label="创建时间"
                disabled
              ></v-text-field>
            </v-col>
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
  id: '',
  classifyName: '',
  createName: '',
  createTime: '',
  count: 0,
})
const statusOptions= [
  { text: '在库', value: 0 },
  { text: '出库', value: 1 },
  { text: '进行中', value: 2 }
]
const formTitle = ref("编辑文献分类")

watch(() => store.state.editClassifyInfo, (newValue) => {
  editedItem.value = newValue
  console.log("value")
  console.log(editedItem)
})



function save () {
  console.log(editedItem.value)
  link("/Classify/save", 'POST',{
    'id': editedItem.value.id,
    'classifyName': editedItem.value.classifyName,
  }, {}, {} ).then(response => {
    if (response.status === 200) {
      alert("文献分类信息保存成功")
      store.commit('closeEditClassifyComponent', null)
    }
  })
}

function close () {
  store.commit('closeEditClassifyComponent', null)
  close()
}
</script>

<style scoped>

</style>
