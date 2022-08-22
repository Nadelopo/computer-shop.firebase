<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(Array(10).fill(false))
const listRef = ref(null)

const heightList = ref(0)

onMounted(() => {
  heightList.value = listRef.value.scrollHeight + 'px'
})
</script>

<template>
  <div class="sidebar">
    <div class="mb-6">
      <h1><router-link :to="{ name: 'Home' }">Главная</router-link></h1>
    </div>
    <div class="wrapper">
      <div class="head" @click="isVisible[0] = !isVisible[0]">Категория</div>
      <div class="overflow-hidden">
        <div class="list" :class="{ active: isVisible[0] }">
          <div class="li" ref="listRef">
            <router-link
              :to="{
                name: 'AdminProducts',
                params: { category: 'processors' },
              }"
            >
              Процессоры
            </router-link>
          </div>
          <div class="li">
            <router-link
              :to="{
                name: 'AdminProducts',
                params: { category: 'videocards' },
              }"
            >
              Видеокарты
            </router-link>
          </div>
          <div class="li">Блоки питания</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.sidebar
  padding: 16px
  background: var(--back-main)
  color: #fff
  min-height: 100vh
  font-size: 18px
  font-weight: 500

.head
  padding: 6px 0
  cursor: pointer
  user-select: none

.li
  padding: 0 10px
  transition:.3s ease
  height: 0
  opacity: 0
  user-select: none
  cursor: pointer

.active
  .li
    opacity: 1
    transition:.3s ease
    margin-bottom: 10px
    height: v-bind(heightList)
</style>
