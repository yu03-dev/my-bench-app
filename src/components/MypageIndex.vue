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
                        <v-icon color="gray" @click="openEdit(data)">mdi-pencil</v-icon>
                      </template>
                      <template v-else>
                        <v-icon @click="cancelEdit(data)">mdi-close</v-icon>
                      </template>
                    </v-col>
                    <v-col cols="2">
                      <template v-if="editId != data.id">
                        <v-icon color="gray" @click="deleteData(data)">mdi-delete</v-icon>
                      </template>
                      <template v-else>
                        <v-icon @click="editData(data)">mdi-check</v-icon>
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
  </v-container>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed,onMounted, ref } from 'vue'

const store = useStore()
onMounted(async() => {
  try {
    await store.dispatch('getRecordsToSet')
  } catch(err) {
    console.error(err)
  }
})

const records = computed(() => {
  return store.getters.getRecords || []
})

const reversed = (array) => {
  return array.slice().reverse();
}

const initdata = {
  weight: 0,
  reps: 0
}
const editId = ref(null)
const openEdit = (data) => {
  editId.value = data.id
  initdata.weight = data.weight
  initdata.reps = data.reps
}
const cancelEdit = (data) => {
  editId.value = null
  data.weight = initdata.weight
  data.reps = initdata.reps
}
const editData = async(data) => {
  try {
    await store.dispatch('editRecords', data)
    editId.value = null
  } catch(error) {
    console.error(error)
  }
}
const deleteData = async(data) => {
  if(confirm('本当に削除しますか？')) {
    try {
      await store.dispatch('deleteRecords', data)
    } catch(error) {
      console.error(error)
    }
  }
}
  
</script>