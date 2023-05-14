import { createStore } from "vuex"
// vuex-persistedstateはまもなくサポートが終了
import createPersistedState from 'vuex-persistedstate'
import api from '@/api'

const store = createStore({
  plugins: [createPersistedState()],

  state: {
    user: null,
    records: null,
    isAuth: false,
    isSnack: false,
    snackMessage: ''
  },

  mutations: {
    setResponses(state, user, records, isAuth) {
      state.user = user,
      state.records = records,
      state.isAuth = isAuth
    },
    setSnack(state, bool) {
      state.isSnack = bool
    },
    setSnackMessage(state, message) {
      state.snackMessage = message
    },
  },

  actions: {
    async getRecordsToSet({ commit }){
      try {
        const response = await api.get('/mypage')
        const {success, message, user, records, isAuth} = response.data
        commit('setResponses', user, records, isAuth)
        if (success) {
          if (import.meta.env.VITE_ENV === 'development') {
            console.log(`[getRecordsToSet]:${message}`)
          }
        } else {
          console.error(`[getRecordsToSet]:${message}`)
        }
      } catch(error) {
        console.error(`[getRecordsToSet]:${error}`)
      }
    },

    async createRecords({ commit }, inputs){
      try {
        const response = await api.post('/mypage', inputs)
        const {success, message, user, records, isAuth} = response.data
        commit('setResponses', user, records, isAuth)
        if (success) {
          if (import.meta.env.VITE_ENV === 'development') {
            console.log(`[createRecords]:${message}`)
          }
        } else {
          console.error(`[createRecords]:${message}`)
        }
      } catch(error) {
        console.error(`[createRecords]:${error}`)
      }
    },

    async editRecords({ commit }, record){
      const id = record.id
      const inputs = {
        weight: record.weight,
        reps: record.reps
      }
      try {
        const response = await api.put(`/mypage/${id}`, inputs)
        const {success, message,  user, records, isAuth} = response.data
        commit('setResponses', user, records, isAuth)
        if (success) {
          if (import.meta.env.VITE_ENV === 'development') {
            console.log(`[editRecords]:${message}`)
          }
        } else {
          console.error(`[editRecords]:${message}`)
        }
      } catch(error) {
        console.error(`[editRecords]:${error}`)
      }
    },

    async deleteRecords({ commit }, record){
      const id = record.id
      try {
        const response = await api.delete(`/mypage/${id}`)
        const {success, message, user, records, isAuth} = response.data
        commit('setResponses', user, records, isAuth)
        if (success) {
          if (import.meta.env.VITE_ENV === 'development') {
            console.log(`[deleteRecords]:${message}`)
          }
        } else {
          console.error(`[deleteRecords]:${message}`)
        }
      } catch(error) {
        console.error(`[deleteRecords]:${error}`)
      }
    },

    async login({ commit }, inputs){
      try {
        const response = await api.post('auth/signin', inputs)
        const {success, message, user, records, isAuth} = response.data
        commit('setResponses', user, records, isAuth)
        if (success) {
          if (import.meta.env.VITE_ENV === 'development') {
            console.log(message)
          }
        } else {
          console.error(message)
        }
      } catch(error) {
        console.error(error)
      }
    },

    async logout({ commit }){
      try {
        const response = await api.post('auth/signout')
        const {success, message, user, records, isAuth} = response.data
        commit('setResponses', user, records, isAuth)
        if (success) {
          if (import.meta.env.VITE_ENV === 'development') {
            console.log(message)
          }
        } else {
          console.error(message)
        }
      } catch(error) {
        console.error(error)
      }
    },

    async snackbar({ commit }, message){
      commit('setSnackMessage', message)
      commit('setSnack', true)
      setTimeout(() => {
        commit('setSnack', false);
      }, 3000);
    },
  },

  getters: {
    getUser: (state) => {
      return state.user
    },

    getRecords: (state) => {
      return state.records
    },

    getIsAuth: (state) => {
      return state.isAuth
    },

    getIsSnack: (state) => {
      return state.isSnack
    },

    getSnackMessage: (state) => {
      return state.snackMessage
    }
  }
})

export default store