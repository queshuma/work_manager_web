<template v-slot:top>
  <v-dialog v-model="$store.state.submitBorrowComponentShow" max-width="60%" class="align-center justify-center">
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
                v-model="editedItem.recordId"
                label="文献编码:"
              ></v-text-field>
            </v-col>
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
                v-model="editedItem.createUserName"
                label="文献创建人:"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.recordClassify"
                label="文献分类:"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.department"
                label="部门名称:"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.departmentUserName"
                label="借阅人员"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.departmentUserPhone"
                label="借阅人联系方式:"
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
          @click="submit"
        >
          提交
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
  recordId: '',
  recordName: '',
  recordClassify: '',
  department: '',
  createUserName: '',
  departmentUserName: '',
  departmentUserPhone: ''
})
const formTitle = ref("文献借阅登记")

watch(() => store.state.borrowInfo, (newValue) => {
  editedItem.value = newValue
})

function submit () {
    console.log(editedItem.value)
    link("/Record/borrow", 'POST',{
      "id": editedItem.value.id,
      "recordId": editedItem.value.recordId,
      "recordName": editedItem.value.recordName,
      "department": editedItem.value.department,
      "departmentUserName": editedItem.value.departmentUserName,
      "departmentUserPhone": editedItem.value.departmentUserPhone,
      "extractTime": "",
      "regressionTime": ""
    }, {}, {} ).then(response => {
      if (response.status === 200) {
        alert("文献借阅成功")
        store.commit('closeSubmitBorrowComponent', null)
        location.reload();
      }
    })
}

function close () {
  store.commit('closeSubmitBorrowComponent', null)
}
</script>

<style scoped>

</style>
