<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <Navbar v-if="!$route.fullPath.includes('admin') && $route.name != 'Auth'" />
  <router-view />
</template>

<style lang="sass">
@tailwind base
@tailwind components
@tailwind utilities

:root
  --shadow: rgba(0, 0, 0, 0.1)
  --color-main: #26a69a
  --color-sec: #2bbbad
  --back-main: #1c1c1c
  --back-sec: #333333
  --color-text: #61BEB5


body
  font-family: 'Roboto Flex'
  box-sizing: border-box
  margin: 0
  background: #f5f5f5


body::-webkit-scrollbar
  width: 8px

body::-webkit-scrollbar-track
  background-color: #fff
  border-radius: 0 0 8px 0


body::-webkit-scrollbar-thumb
  background: #7b7b7b
  border-radius: 10px
  transform: matrix(1, 0, 0, -1, 0, 0)

.btn
  border: none
  border-radius: 4px
  padding: 0.375rem 0.75rem
  background: var(--color-main)
  color: #fff
  cursor: pointer
  transition: .3s
  display: flex
  align-items: center
  justify-content: center
  &:hover
    background: #2bbbad
    transition: .3s
  &:active
    transform: scale(0.9)

.container
  margin-right: auto
  margin-left: auto
  width: 100%
  padding: 6px 12px

.minput
  all: unset
  width: 100%
  height: 30px
  border-bottom: 1px solid #9e9e9e
  transition: 0.3s
  &:focus
    border-bottom:1px solid var(--color-main)
    -webkit-box-shadow:0 1px 0 0 var(--color-main)
    box-shadow:0 1px 0 0 var(--color-main)
    transition: 0.3s

// @media(min-width: 1400px)
//   .container
//       width: 	1320px

// @media (min-width: 1399px) and (max-width: 1200px)
//   .container
//     width: 1140px

// @media (min-width: 1199px) and (max-width: 992px)
//   .container
//     width: 960px
</style>
