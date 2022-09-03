<script setup>
defineProps({
  textfirst: {
    type: String,
    default: 'true',
  },
  textsecond: {
    type: String,
    default: 'false',
  },
  modelValue: Boolean,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="wrap">
    <button
      type="button"
      :class="modelValue ? 'btn' : 'btn__notactive'"
      @click="$emit('update:modelValue', true)"
    >
      {{ textfirst }}
    </button>
    <button
      type="button"
      class="btn"
      :class="!modelValue ? 'btn' : 'btn__notactive'"
      @click="$emit('update:modelValue', false)"
    >
      {{ textsecond }}
    </button>
  </div>
</template>

<style scoped lang="sass">

.wrap
  display: flex
  gap: 10px
</style>
