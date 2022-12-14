<script setup>
import UserSvg from '@/icons/user.svg'
import FavouritesSVG from '@/icons/favourites.svg'
import Popup from './UI/Popup.vue'
import { usersStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'
import firebase from 'firebase/app'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'

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

const open = ref(false)
</script>

<template>
  <header class="mb-8 py-1">
    <div class="container">
      <div class="root__small">
        <div>
          <button class="dots" @click="open = !open">
            <div class="dot" :class="{ 'dot__active-f': open }"></div>
            <div class="dot" :class="{ dot__middle__active: open }"></div>
            <div class="dot" :class="{ 'dot__active-l': open }"></div>
          </button>
        </div>
        <div class="flex justify-end">
          <router-link :to="{ name: 'Home' }">
            <img
              src="@/assets/img/logoChangeWhiteSizeFnew.png"
              width="95"
              alt=""
            />
          </router-link>
        </div>
      </div>
      <div class="root">
        <div class="logo">
          <router-link :to="{ name: 'Home' }">
            <img
              src="@/assets/img/logoChangeWhiteSizeFnew.png"
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
            <router-link :to="{ name: 'Delivery' }" class="li__line">
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
                <div v-if="userEmail" @click="logout">выйти</div>
                <div v-else @click="$router.push({ name: 'Auth' })">войти</div>
                <router-link :to="{ name: 'Profile' }" @click="checkAuth">
                  профиль
                </router-link>

                <router-link
                  v-if="userEmail == 'admin@admin.admin'"
                  :to="{ name: 'Admin' }"
                >
                  admin
                </router-link>
              </template>
            </Popup>
          </div>
          <div>
            <FavouritesSVG fill="#fff" width="25" class="cursor-pointer" />
          </div>
          <div>
            <router-link :to="{ name: 'Cart' }">
              <img src="@/assets/img/shopCart.png" class="cart__icon" alt="" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
  <Sidebar v-if="open" v-model:is-open="open" />
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
  @media (max-width: 1023px)
    display: none


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

.root__small
  color: #fff
  display: grid
  grid-template-columns: repeat(2, 1fr)
  align-items: center
  @media (min-width: 1023px)
    display: none
  .dots
    width: 40px
    // height: 30px
    display: flex
    flex-direction: column
    gap: 6px
    .dot
      transition: .25s
      width: 100%
      background: #fff
      height: 3px
      border-radius: 4px
      &__active
        &-f
          transform-origin: 18%
          transform: rotate(45deg)
        &-l
          transform-origin: 18%
          transform: rotate(-45deg)
    .dot__middle
      opacity: 1
      &__active
        opacity: 0
</style>
