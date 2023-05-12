<template>
  <v-app-bar app clippedLeft flat dark color="indigo darken-3">
    <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
  </v-app-bar>
  <v-system-bar>
    <v-spacer></v-spacer>

    <v-icon>mdi-square</v-icon>

    <v-icon>mdi-circle</v-icon>

    <v-icon>mdi-triangle</v-icon>
  </v-system-bar>

  <v-navigation-drawer v-model="drawer">
    <v-sheet
      color="grey-lighten-4"
      class="pa-4"
    >
      <v-avatar
        class="mb-4"
        color="grey-darken-1"
        size="64"
      ></v-avatar>

      <div v-if="user">{{ user.username }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="[icon, text, to] in links"
        :key="icon"
        :to="to"
        link
      >
        <template v-slot:prepend>
          <v-icon>{{ icon }}</v-icon>
        </template>

        <v-list-item-title>{{ text }}</v-list-item-title>
      </v-list-item>

      <v-list-item
        v-for="[icon, text] in logoutLinks"
        :key="icon"
        @click="logout"
        link
      >
        <template v-slot:prepend>
          <v-icon>{{ icon }}</v-icon>
        </template>

        <v-list-item-title>{{ text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { ref,computed } from 'vue';
import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  
  const router = useRouter()
  const store = useStore()
  const drawer = ref(true)
  const user = computed(() => {
    return store.getters.getUser || []
  })

  const logout = async() => {
    try {
      await store.dispatch('logout')
      store.commit('setSnackMessage', 'ログアウトしました')
      store.commit('setSnack', true)
      router.push('/')
    } catch(error) {
      console.error(error)
    }
  }
  const links = ref([
    ['mdi-account', 'MyPage', '/mypage'],
  ])
  const logoutLinks = ref([
    ['mdi-logout', 'Logout'],
  ])
</script>