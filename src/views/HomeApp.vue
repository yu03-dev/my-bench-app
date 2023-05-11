<template>
  <v-app>
    <div class="home">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="10" md="8" class="text-center">
          <h1 class="text-with-black text-h1 font-weight-bold" style="color:whitesmoke">My Bench App</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn @click="login" color="primary" class="font-weight-bold mr-2">ログイン</v-btn>
          <v-btn @click="signup" color="primary" class="font-weight-bold ml-2">サインアップ</v-btn>
        </v-col>
      </v-row>
      <div style="color:white">
        <a href="https://jp.freepik.com/free-photo/man-workingout-in-the-local-gym_20989285.htm#query=%E3%83%99%E3%83%B3%E3%83%81%20%E3%83%97%E3%83%AC%E3%82%B9&position=2&from_view=keyword&track=ais">著作者：fabrikasimf</a>／出典：Freepik
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const login = () => {
  router.push('/signin')
}

const signup = () => {
  router.push('/signup')
}

</script>

<style scoped>
.home {
  background: url('home_bench_app.jpg') no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.text-with-black {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}
</style>