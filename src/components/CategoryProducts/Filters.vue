<script setup>
import FilterInputs from '../UI/FilterInputs.vue'
import { filtersStore } from '@/stores/filterStore'
import { storeToRefs } from 'pinia'
import { watch, ref } from 'vue'
import FilterCheckBox from '../UI/FilterCheckBox.vue'
import { useRoute } from 'vue-router'
import SkeletinFIlter from './SkeletinFIlter.vue'

const { minP, maxP, filterFields, copyFilter } = storeToRefs(filtersStore())
const { updateFilters, updateFilterProducts } = filtersStore()

const route = useRoute()
updateFilters(route.params.category)
watch(
  () => route.params.category,
  (cur) => updateFilters(cur)
)

const filterTrigger = ref(false)
const apply = () => {
  filterTrigger.value = !filterTrigger.value
  updateFilterProducts(route)
}
</script>

<template>
  <div>
    <div v-if="!copyFilter.length">
      <SkeletinFIlter />
    </div>
    <div v-else class="root">
      <div>
        <div class="text-center my-2">цена</div>
        <FilterInputs
          v-model:minVal="minP"
          v-model:maxVal="maxP"
          :trigger="filterTrigger"
          en-description="price"
          :step="500"
        />
      </div>

      <div v-for="(item, index) in filterFields" :key="item.title">
        <div class="text-center my-2">{{ item.title }}</div>
        <div v-if="item.type">
          <FilterInputs
            v-model:minVal="item.params.min"
            v-model:maxVal="item.params.max"
            :trigger="filterTrigger"
            :en-description="item.enTitle"
            :step="item.params.step"
          />
        </div>
        <div v-for="(g, i) in item" v-else :key="g.id">
          <FilterCheckBox
            v-if="g != item.title && g != item.enTitle && g != item.type"
            :id="index + i"
            v-model="copyFilter[index][i].title"
            :name="g.title"
            :en-title="item.enTitle"
            :title="item.title"
          />
        </div>
      </div>
      <div class="flex justify-center">
        <button class="btn" @click="apply">применить</button>
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
