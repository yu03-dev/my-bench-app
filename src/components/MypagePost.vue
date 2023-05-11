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
          <v-snackbar v-if="snackbar">
            Your process has been completed successfully!
            <v-btn color="grayw" text @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useStore } from 'vuex'
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const store = useStore()

let snackbar = false

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
    // popが出ない...
    snackbar = true
    Object.assign(inputs, initialInputs)
    // inputsを初期化したい
  } catch(err) {
    console.error(err)
  }
}
</script>
