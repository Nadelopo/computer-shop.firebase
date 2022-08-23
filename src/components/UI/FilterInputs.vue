<script setup>
import { ref } from 'vue'
const props = defineProps(['description', 'max', 'step'])

const minPric = ref(0)
const maxPric = ref(props.max)

const emit = defineEmits(['update:maxVal', 'update:minVal'])

const filter = () => {
  const minprice = minPric.value
  const maxprice = maxPric.value
  emit('update:minVal', minPric.value)
  emit('update:maxVal', maxPric.value)

  if (minPric.value > maxPric.value) {
    maxPric.value = minprice
    minPric.value = maxprice
  }

  if (minPric.value < 0 || !minPric.value) {
    minPric.value = 0
  }

  if (maxPric.value > props.max || !maxPric.value) {
    maxPric.value = props.max
  }
}
</script>

<template>
  <div>
    <div class="text-center mb-2 mt-4">{{ description }}</div>
    <div class="grid">
      <div class="text-end">
        <input
          @keyup.enter="filter"
          @input="filter"
          :step="step"
          ref="refMin"
          min="0"
          :max="max"
          class="filter_price min"
          placeholder="0"
          type="number"
          v-model="minPric"
        />
      </div>
      <div>
        <div class="line"></div>
      </div>
      <div class="text-start">
        <input
          @keyup.enter="filter"
          @input="filter"
          :step="step"
          ref="refMax"
          min="0"
          :max="max"
          class="filter_price max"
          :placeholder="max"
          type="number"
          v-model="maxPric"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

.grid
  display: grid
  grid-template-columns: 1fr auto 1fr
  align-items: center
  grid-gap: 30px

.filter_price
  border: 2px solid #454545
  padding: 4px
  border-radius: 6px
  max-width: 90px
  width: 100%
  outline: none
  transition: 0.3s

.filter_price:focus
  border-color: #26a69a
  transition: 0.3s

.line
  border: 1px solid #000
  height: 0
  width: 12px
  background-color: #000
</style>
