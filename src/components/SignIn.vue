<template>
  <v-card width="500px" class="mx-auto mt-5 px-3">
    <v-card-title class="py-5">
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="inputs.username"
          :error-messages="v$.username.$errors.map(e => e.$message)"
          :counter="10"
          prepend-icon="mdi-account-circle"
          label="ユーザ名"
          required
          @input="v$.username.$touch"
          @blur="v$.username.$touch"
        ></v-text-field>

        <v-text-field
          v-model="inputs.password"
          :error-messages="v$.password.$errors.map(e => e.$message)"
          prepend-icon="mdi-lock"
          label="パスワード"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          required
          @input="v$.password.$touch"
          @blur="v$.password.$touch"
        ></v-text-field>

        <v-btn
          class="me-4 mt-3"
          @click="onSubmit"
        >
          ログイン
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  <snack-bar/>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required } from '@vuelidate/validators'
  import { ref } from 'vue'
  import SnackBar from '@/components/SnackBar.vue'

  const store = useStore()
  const router = useRouter()
  const show = ref(false)

  const initialInputs = {
    username: '',
    password: ''
  }
  const inputs = reactive({
    initialInputs
  })
  const rules = {
    username: { required },
    password: { required },
  }
  const v$ = useVuelidate(rules, inputs)

  const onSubmit = async() => {
    if (v$.value.$invalid) {
      return
    }
    try {
      await store.dispatch('login', inputs)
      if (store.getters.getIsAuth) {
        router.push('/mypage')
        await store.dispatch('snackbar', 'ログインしました')
      } else {
        await store.dispatch('snackbar', 'ログインできませんでした')
      }
    } catch(error) {
      console.error(error)
    }
  }


</script>