import { defineStore } from 'pinia'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(username: string, password: string) {
      const { data } = await api.post('login', { username, password })
      this.token = data.token
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', username)
    },
    logout() {
      this.token = ''
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})
