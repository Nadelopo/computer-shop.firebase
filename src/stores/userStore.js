import { defineStore } from 'pinia'
import firebase from 'firebase/app'
import 'firebase/auth'
import { ref, computed } from 'vue'
import { getProfile, getTestProfile } from '@/firebase'

export const usersStore = defineStore('users', {
  state: () => {
    const userId = ref()
    const userEmail = ref()
    const userDoc = computed(() => getTestProfile(userId.value ?? 's'))
    const user = computed(() => userDoc.value.value[0])
    firebase.auth().onAuthStateChanged(async function (use) {
      if (use) {
        userId.value = use.uid
        userEmail.value = use.email
      } else {
        userId.value = null
        userEmail.value = null
      }
    })
    return { user, userEmail }
  },
  actions: {
    async getCurrentUserId() {
      const userId = await firebase.getCurrentUser()
      return userId.uid
    },
    async getCurrentUserEmail() {
      const userId = await firebase.getCurrentUser()
      return userId.email
    },
    async getCurrentUserData() {
      const user = await getProfile((await firebase.getCurrentUser()).uid)
      return user
    },
  },
})
