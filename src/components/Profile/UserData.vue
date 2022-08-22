<script setup>
import { usersStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import { updateProfile } from '@/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const { userEmail, user } = storeToRefs(usersStore())
const router = useRouter()

const changeEmail = ref()
const changePhone = ref()
const changeName = ref()

watchEffect(() => {
  changeEmail.value = userEmail?.value
  changePhone.value = user.value?.phone
  changeName.value = user.value?.name
})

const updateData = () => {
  updateProfile(user.value.userId, {
    name: changeName.value,
    phone: changePhone.value,
  })
  firebase
    .auth()
    .currentUser.updateEmail(changeEmail.value)
    .catch((e) => {
      console.log(e.code == 'auth/invalid-email')
      if (e.code == 'auth/invalid-email') {
        Swal.fire(
          'Упс',
          'Адрес электронной почты введен в неверном формате',
          'error'
        )
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Перезойдите в аккаунт',
          text: 'Для смены почты нужна недавняя авторизация',
          showDenyButton: true,
          confirmButtonText: 'Ок',
          denyButtonText: `Выйти`,
        }).then((result) => {
          if (!result.isConfirmed) {
            firebase.auth().signOut()
            router.push({ name: 'Auth' })
          }
        })
      }
    })
}

const reset = async () => {
  firebase
    .auth()
    .sendPasswordResetEmail(userEmail.value)
    .then(() => {
      Swal.fire('Зайдите на почту', '', 'success')
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
}
</script>

<template>
  <div>
    <div class="container">
      <div class="root">
        <form @submit.prevent="updateData">
          <div class="change__data">
            <div>Email:</div>
            <div>
              <input
                type="email"
                class="minput"
                v-model="changeEmail"
                required
              />
            </div>
          </div>
          <div class="change__data">
            <div>Телефон:</div>
            <div>
              <input
                type="text"
                class="minput"
                pattern="[8]\s\d{3}\s\d{3}\s\d{2}\s\d{2}"
                title="8 999 888 77 66"
                v-model="changePhone"
              />
            </div>
          </div>
          <div class="change__data">
            <div>Имя:</div>
            <div>
              <input
                type="text"
                class="minput"
                v-model="changeName"
                minlength="3"
                required
              />
            </div>
          </div>
          <div>
            <button class="btn mb-6">сохранить</button>
          </div>
        </form>
      </div>

      <div>
        <button class="btn mb-6" @click="reset">восстановить пароль</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.change__data
  display: grid
  grid-template-columns: 100px 200px
  align-items: end
  margin-bottom: 40px
</style>
