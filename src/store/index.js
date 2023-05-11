import { createStore } from "vuex"
import createPersistedState from 'vuex-persistedstate'
import api from '@/api'



const store = createStore({
  plugins: [createPersistedState()],

  state: {
    user: null,
    records: null,
    isAuth: false,
    isDataLoaded: false
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setRecords(state, records) {
      state.records = records
    },
    setAuth(state) {
      state.isAuth = true
    },
    resetAuth(state) {
      state.user = null
      state.records = null
      state.isAuth = false
      state.isDataLoaded = false
    },
    setDataLoaded(state) {
      state.isDataLoaded = true
    }
  },

  actions: {
    async getRecordsToSet({ commit }){
      try {
        const response = await api.get('/mypage')
        if (response.data.success) {
          console.log(`[getRecordsToSet]:${response.data.message}`)
          commit('setDataLoaded')
          commit('setRecords', response.data.records)
        } else {
          console.log(`[getRecordsToSet]:${response.data.message}`)
        }
      } catch(error) {
        console.error(`[getRecordsToSet]:${error}`)
      }
    },

    async createRecords({ commit }, inputs){
      try {
        const response = await api.post('/mypage', inputs)
        if (response.data.success) {
          console.log(`[createRecords]:${response.data.message}`)
          commit('setRecords', response.data.records)
        } else {
          console.log(`[createRecords]:${response.data.message}`)
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
        if (response.data.success) {
          console.log(`[editRecords]:${response.data.message}`)
          commit('setRecords', response.data.records)
        } else {
          console.log(`[editRecords]:${response.data.message}`)
        }
      } catch(error) {
        console.error(`[editRecords]:${error}`)
      }
    },

    async deleteRecords({ commit }, record){
      const id = record.id
      console.log(id)
      try {
        const response = await api.delete(`/mypage/${id}`)
        if (response.data.success) {
          console.log(`[deleteRecords]:${response.data.message}`)
          commit('setRecords', response.data.records)
        } else {
          console.log(`[deleteRecords]:${response.data.message}`)
        }
      } catch(error) {
        console.error(`[deleteRecords]:${error}`)
      }
    },

    async login({ commit }, inputs){
      try {
        const response = await api.post('auth/signin', inputs)
        if (response.data.success) {
          console.log(response.data.message)
          commit('setUser', response.data.user)
          commit('setAuth')
        } else {
          console.log(response.data.message)
        }
      } catch(error) {
        console.error(error)
      }
    },

    async logout({ commit }){
      try {
        const response = await api.post('auth/signout')
        if (response.data.success) {
          console.log(response.data.message)
          commit('resetAuth')
        } else {
          console.log(response.data.message)
        }
      } catch(error) {
        console.error(error)
      }
    }
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

    getIsDataLoaded: (state) => {
      return state.isDataLoaded
    }
  }
})

export default store