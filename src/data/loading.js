import { defineStore } from 'pinia'

export const useLoading = defineStore('isloading', {
  state: () => {
    return {
      loading: {
        albums: false
      }
    }
  },
  actions: {}
})