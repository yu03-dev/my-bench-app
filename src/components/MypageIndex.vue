<template>
  <v-container
    class="py-8 px-6"
    fluid
  >
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <h2 v-if="Object.keys(records).length === 0">まだ記録がありません</h2>
        <v-card v-else>
          <v-list>
            <v-list-item v-for="[date, datas] in Object.entries(records)" :key="date">
              <v-list-item-title>
                <h2>{{ date }}</h2>
              </v-list-item-title>
              <v-list>
                <v-list-item v-for="(data, index) in reversed(datas)" :key="data.id">
                  <v-row>
                    <v-col cols="9">
                      <template v-if="editId != data.id">
                        {{ index+1 }}. {{ data.weight }}kg × {{ data.reps }}回
                      </template>
                      <template v-else>
                        <v-row>
                          <v-col cols="5">
                            <v-text-field
                            v-model="data.weight"
                            label="重量（kg）"
                            outlined
                            required
                            type="number">
                            </v-text-field>
                          </v-col>
                          <v-col cols="1">
                            <span>×</span>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                            v-model="data.reps"
                            label="回数"
                            outlined
                            required
                            type="number">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </template>
                    </v-col>
                    <v-col cols="1">
                      <template v-if="editId != data.id">
                        <v-icon color="gray" @click="onOpenEditMenu(data)">mdi-pencil</v-icon>
                      </template>
                      <template v-else>
                        <v-icon @click="onCloseEditMenu(data)">mdi-close</v-icon>
                      </template>
                    </v-col>
                    <v-col cols="2">
                      <template v-if="editId != data.id">
                        <v-icon color="gray" @click="onDelete(data)">mdi-delete</v-icon>
                      </template>
                      <template v-else>
                        <v-icon @click="onEdit(data)">mdi-check</v-icon>
                      </template>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <snack-bar/>
  </v-container>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue'

const store = useStore()
const records = computed(() => {
  return store.getters.getRecords || []
})

onMounted(async() => {
  try {
    await store.dispatch('getRecordsToSet')
  } catch(err) {
    console.error(err)
  }
})

const reversed = (array) => {
  return array.slice().reverse();
}

const temp = {
  weight: null,
  reps: null
}
const editId = ref(null)
const onOpenEditMenu = (data) => {
  editId.value = data.id
  temp.weight = data.weight
  temp.reps = data.reps
}
const onCloseEditMenu = (data) => {
  editId.value = null
  data.weight = temp.weight
  data.reps = temp.reps
}
const onEdit = async(data) => {
  try {
    await store.dispatch('editRecords', data)
    editId.value = null
    await store.dispatch('snackbar', 'レコードを編集しました')
  } catch(error) {
    console.error(error)
  }
}
const onDelete = async(data) => {
  if(confirm('本当に削除しますか？')) {
    try {
      await store.dispatch('deleteRecords', data)
      await store.dispatch('snackbar', 'レコードを削除しました')
    } catch(error) {
      console.error(error)
    }
  }
}
  
</script>