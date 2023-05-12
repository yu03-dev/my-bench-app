<template>
  <v-snackbar
      v-model="snackbar"
    >
      {{ snackMessage }}
      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="store.commit('setSnack', false)"
        >
          CLOSE
        </v-btn>
      </template>
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