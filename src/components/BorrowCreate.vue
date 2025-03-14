<template v-slot:top>
    <v-card v-if="$store.state.showComponent" show max-width="80%">
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.recordName"
                label="文献名称:"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.establishName"
                label="建立人姓名"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.fileSource"
                label="数据来源"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.establishDate"
                label="建立时间"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.recordClassify"
                label="分类"
              ></v-text-field>
            </v-col>
            <v-text-field
              v-model="editedItem.createUserName"
              label="创建人"
            ></v-text-field>
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
</template>

<script setup>
import { useStore } from "vuex";
import { watch,ref } from "vue";

let store = useStore()

const editedItem = ref({
  recordName: '',
  recordClassify: '',
  fileSource: '',
  establishName: '',
  establishDate: '',
  createUserName: '',
  createDate: '',
})
const show = ref(false)


</script>

<style scoped>

</style>
