<template>
  <v-container class="d-flex justify-center align-center">
    <v-card class="mx-auto">
      <v-card-title class="text-center">Bench Press</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="inputs.weight"
                label="重量（kg）"
                outlined
                required
                type="number"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex align-center justify-center" cols="12" md="1">
              <span class="text-h5 font-weight-bold">×</span>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="inputs.reps"
                label="回数"
                outlined
                required
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                class="me-4 mt-3"
                @click="onSubmit"
              >
                追加
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <snack-bar/>
  </v-container>
</template>

<script setup>
import { useStore } from 'vuex'
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import SnackBar from '@/components/SnackBar.vue'

const store = useStore()

const initialInputs = {
  weight: '',
  reps: ''
}
const inputs = reactive({
  ...initialInputs
})
const rules = {
  weight: { required },
  reps: { required },
}
const v$ = useVuelidate(rules, inputs)

const onSubmit = async () => {
  if (v$.$invalid) {
    alert('Validation failed!')
    return
  }
  try {
    await store.dispatch('createRecords', inputs)
    // snackbar
    store.commit('setSnackMessage', 'レコードを作成しました')
    store.commit('setSnack', true)
    Object.assign(inputs, initialInputs)
  } catch(err) {
    console.error(err)
  }
}
</script>
