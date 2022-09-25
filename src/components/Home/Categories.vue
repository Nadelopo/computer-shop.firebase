<script setup>
import { storeToRefs } from 'pinia'
import { categoriesStore } from '../../stores/categoriesStore'

const { categories } = storeToRefs(categoriesStore())
</script>

<template>
  <div class="container">
    <div v-if="categories" class="grid">
      <div v-for="category in categories.arr" :key="category.img">
        <div
          class="lev"
          @click="
            $router.push({
              name: 'CategoryPage',
              params: { category: category.enName },
            })
          "
        >
          <div class="wrap">
            <img :src="category.img" alt="" class="mx-auto mb-auto" />

            <div class="text-center text1">{{ category.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.lev
  width: 100%
  height: 220px
  background-color: #fff
  border-radius: 8px
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 26%)
  vertical-align: middle
  display: inline-grid
  align-content: center
  cursor: pointer

.text1
  font-weight: 600
  font-size: 20px
  transition: .2s
  .lev:hover &
    color: var(--color-text)

.grid
  display: grid
  grid-template-columns: repeat(4, 1fr)
  gap: 40px

.wrap
  padding: 20px 0
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: inherit
</style>
