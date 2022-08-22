<script setup>
import UserSvg from '@/icons/user.svg'
import FavouritesSVG from '@/icons/favourites.svg'
import Popup from './UI/Popup.vue'
import { usersStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'
import firebase from 'firebase/app'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const { userEmail } = storeToRefs(usersStore())
const router = useRouter()

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(
      () => {
        router.push({ name: 'Home' })
        Swal.fire('Вы вышли с аккаунта', '', 'success')
      },
      (err) => {
        console.log(err)
      }
    )
}

const checkAuth = () => {
  if (!userEmail.value) {
    Swal.fire({
      icon: 'error',
      title: 'Необходимо авторизироваться!',
      text: '',
      showDenyButton: true,
      confirmButtonText: 'Войти',
      denyButtonText: `Ок`,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push({ name: 'Auth' })
      }
    })
  }
}
</script>

<template>
  <header class="mb-8">
    <div class="container">
      <div class="root">
        <div class="logo">
          <router-link :to="{ name: 'Home' }">
            <img
              src="@/assets/img/logoChangeWhiteSizeF.png"
              width="95"
              alt=""
            />
          </router-link>
        </div>
        <div class="nav">
          <div class="li">
            <router-link :to="{ name: 'Home' }" class="li__line">
              ГЛАВНАЯ
            </router-link>
          </div>
          <div class="li">
            <router-link :to="{ name: 'Home' }" class="li__line">
              ТОВАРЫ
            </router-link>
          </div>
          <div class="li">
            <router-link :to="{ name: 'About' }" class="li__line">
              О НАС
            </router-link>
          </div>
          <div class="li">
            <router-link :to="{ name: 'Home' }" class="li__line">
              ДОСТАВКА
            </router-link>
          </div>
          <div class="li">
            <router-link :to="{ name: 'Home' }" class="h-full">
              КОНТАКТЫ
            </router-link>
          </div>
        </div>
        <div class="nav__rigth">
          <div>
            <Popup>
              <template #active>
                <UserSvg width="25" class="user__svg" />
              </template>
              <template #content>
                <!-- <router-link :to="{ name: 'Auth' }"> -->
                <div v-if="userEmail" @click="logout">выйти</div>
                <div v-else @click="$router.push({ name: 'Auth' })">войти</div>
                <!-- </router-link> -->
                <div>
                  <router-link :to="{ name: 'Profile' }" @click="checkAuth">
                    профиль
                  </router-link>
                </div>
                <div v-if="userEmail == 'admin@admin.admin'">
                  <router-link :to="{ name: 'Admin' }">admin</router-link>
                </div>
              </template>
            </Popup>
          </div>
          <div>
            <FavouritesSVG fill="#fff" width="25" class="cursor-pointer" />
          </div>
          <div>
            <img src="@/assets/img/shopCart.png" class="cart__icon" alt="" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="sass">

header
  background: var(--back-main)
  user-select: none

.root
  color: #fff
  display: grid
  grid-template-columns:  180px 1fr 180px
  align-items: center


.nav
  display: grid
  grid-template-columns: repeat(5, auto)
  margin: 0 auto
  position: relative
  div
    font-size: 14px
    text-align: center
  &::after
    top: 0
    content: ""
    width: 100%
    background-color: rgba(255,255,255, .8)
    position: absolute
    height: 1px
  &::before
    content: ""
    bottom: 0
    width: 100%
    background-color: rgba(255,255,255, .8)
    position: absolute
    height: 1px

.li
  a
    display: flex
    align-items: center
    padding: 8px
    color: rgba(255,255,255, .8)
    transition: .2s
    &:hover
      color: rgba(255,255,255, 1)

.li__line
  &::after
    content: ""
    width: 1px
    height: 32px
    background-color: #d7d7d7
    display: inline-block
    transform: rotate(25deg) translateY(13px)
    margin: -10px 0 10px 30px

.user__svg
  fill: rgba(255,255,255, .8)
  transition: .2s
  cursor: pointer
  &:hover
    fill: rgba(255,255,255, 1)

.nav__rigth
  display: grid
  grid-template-columns: repeat(3, 60px)
  align-items: center
  justify-items: end

.cart__icon
  cursor: pointer
  height: 25px
</style>
