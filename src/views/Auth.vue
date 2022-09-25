<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import Swal from 'sweetalert2'
import { db } from '@/firebase'

const router = useRouter()

const active = ref(true)
const email = ref('')
const password = ref('')
const name = ref('')

const login = () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then(
      () => {
        router.push({ name: 'Home' })
      },
      () => {
        if (email.value == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Укажите почту',
          })
        } else if (password.value == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Введите пароль!',
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Неверное имя пользователя или пароль',
          })
        }
      }
    )
}

const signUp = () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(
      (user) => {
        db.collection('users').doc(user.user.uid).set({
          productsId: [],
          name: name.value,
          phone: '',
          favourites: [],
          cart: [],
        }),
          router.push('/')
      },
      (err) => {
        if (name.value == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Укажите имя',
          })
        } else if (email.value == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Укажите почту',
          })
        } else if (password.value == '') {
          Swal.fire({
            icon: 'warning',
            title: 'Введите пароль!',
          })
        } else if (err.code == 'auth/weak-password') {
          Swal.fire({
            icon: 'warning',
            title: 'Пароль должен состоять не менее чем из 6 символов',
          })
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Адрес электронной почты уже используется',
          })
        }
      }
    )
}

const auth = () => {
  if (active.value) login()
  else signUp()
}
</script>

<template>
  <div class="back">
    <form class="main" @submit.prevent="auth">
      <div class="head">
        <div
          class="cursor-pointer uppercase text"
          :class="{ active: active }"
          @click="active = true"
        >
          войти
        </div>
        <div
          class="cursor-pointer uppercase text"
          :class="{ active: !active }"
          @click="active = false"
        >
          зарегистрироваться
        </div>
      </div>
      <div v-if="!active" class="flex flex-col mb-4">
        <label class="label" for="">ИМЯ</label>
        <input v-model="name" class="input" type="text" minlength="4" />
      </div>
      <div class="flex flex-col mb-4">
        <label class="label" for="">ПОЧТА</label>
        <input v-model="email" class="input" type="email" />
      </div>
      <div class="flex flex-col mb-4">
        <label class="label" for="">ПАРОЛЬ</label>
        <input v-model="password" class="input" type="password" />
      </div>
      <div class="my-12">
        <button class="btn btnn">
          {{ active ? 'Войти' : 'Зарегистрироваться' }}
        </button>
      </div>
      <hr class="mb-4" />
      <div v-if="active" class="text-center">
        <span
          class="link cursor-pointer"
          @click="$router.push({ name: 'Reset' })"
        >
          Забыли пароль?
        </span>
      </div>
      <div class="text-center mt-2" @click="$router.push('/')">
        <span class="link cursor-pointer">Назад</span>
      </div>
    </form>
  </div>
</template>

<style scoped lang="sass">
.back
  background:  linear-gradient(45deg, rgba(38, 166, 154, .8), rgb(32, 95, 109, .8))
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
.main
  max-width: 400px
  width: 100%
  background:  linear-gradient( rgba(38, 166, 154, .8), rgb(32, 95, 109, .8))
  border-radius: 10px
  padding: 30px
  color: #fff
  transition: .3s
  animation: main .4s ease
  @keyframes main
    0%
      transform: perspective(2500px) rotateY(-90deg)
    100%
      transform: perspective(2500px) rotateY(0)


.head
  display: grid
  grid-template-columns: 60px auto
  margin-bottom: 48px

.text
  padding-left: 16px
  color: rgba(255,255,255, 0.7)
  transition: .3s
  &.active
    color: rgba(255,255,255, 1)

.label
  font-size: 14px
  color: rgba(255,255,255,.8)
  margin: 0 0 4px 16px

hr
  border: none
  height: 1px
  background: rgba(255,255,255, .4)

.input
    outline: none
    border: none
    color: #fff
    background: rgba(255,255,255,.2)
    height: 35px
    border-radius: 20px
    padding-left: 20px
    transition: 0.3s linear
    &:focus
        background: rgba(255,255,255,.3)
        transition: 0.3s linear

.btnn
    height: 40px
    width: 100%
    border-radius: 20px

.link
  color: rgba(255,255,255, .75)
  transition: .2s linear
  &:hover
    color: rgba(255,255,255, 1)
    transition: .2s linear
</style>
