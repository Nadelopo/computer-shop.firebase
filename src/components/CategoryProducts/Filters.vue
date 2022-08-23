<script setup>
import FilterInputs from '../UI/FilterInputs.vue'
import { filtersStore } from '@/stores/filterStore'
import { storeToRefs } from 'pinia'

import CheckBox from '../UI/CheckBox.vue'

const { minP, maxP, filterFilters, copyFilter } = storeToRefs(filtersStore())
</script>

<template>
  <div class="root">
    <FilterInputs
      v-model:minVal="minP"
      v-model:maxVal="maxP"
      :description="'Цена'"
      :max="300000"
      :step="500"
    />

    <div v-for="(item, index) in filterFilters" :key="item.title">
      <h1>{{ item.title }}</h1>
      <div v-for="(g, i) in item" :key="g.id">
        <CheckBox
          v-if="g != item.title"
          :id="index + i"
          :name="g.title"
          v-model="copyFilter[index][i].title"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

.root
  background: #fff
  padding: 20px
  border-radius: 8px
  display: flex
  flex-direction: column
  gap: 30px
</style>
