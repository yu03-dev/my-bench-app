<template>
  <v-card width="500px" class="mx-auto mt-5 px-3">
    <v-card-title class="py-5">
      <h1 class="display-1">サインアップ</h1>
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

        <v-text-field
          v-model="inputs.repassword"
          :error-messages="v$.repassword.$errors.map(e => e.$message)"
          prepend-icon="mdi-lock"
          label="パスワードの確認"
          :type="reShow ? 'text' : 'password'"
          :append-icon="reShow ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="reShow = !reShow"
          required
          @input="v$.repassword.$touch"
          @blur="v$.repassword.$touch"
        ></v-text-field>

        <v-btn
          class="me-4 mt-3"
          @click="onSubmit"
        >
          サインアップ
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { reactive, ref, computed } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, sameAs } from '@vuelidate/validators'
  import api from '@/api'
  import { useRouter } from 'vue-router';


  const router = useRouter()
  const initialInputs = {
    username: '',
    password: '',
    repassword: ''
  }
  const inputs = reactive({
    ...initialInputs
  })
  const rules = computed(() => ({
    username: { required },
    password: { required },
    repassword: { required, sameAs: sameAs(inputs.password) }
  }))
  const v$ = useVuelidate(rules, inputs)

  const show = ref(false)
  const reShow = ref(false)

  const onSubmit = async() => {
    if (v$.$invalid) {
      alert('Validation failed!')
      return
    }
    try {
      const response = await api.post('auth/signup', inputs)
      if (response.data.success) {
        if (import.meta.env.VITE_ENV === 'development') {
          console.log(response.data.message)
        }
        router.push('/signin')
      } else {
        console.error(response.data.message)
        alert('サインアップできませんでした')
      }
    } catch(error) {
      console.error(error)
      throw new Error('Failed to signup process.')
    }
  }
</script>