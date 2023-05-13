<template>
  <v-snackbar v-model="snackbar">
    {{ snackMessage }}
  </v-snackbar>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const snackMessage = computed(() => {
  return store.getters.getSnackMessage
})
const snackbar = computed(() => {
  return store.getters.getIsSnack
})

</script>