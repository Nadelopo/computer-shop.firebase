<script setup>
import ProductsList from '../components/CategoryProducts/ProductsList.vue'
import Filters from '../components/CategoryProducts/Filters.vue'
</script>

<template>
  <div>
    <div class="container grid">
      <Filters />
      <ProductsList />
    </div>
  </div>
</template>

<style scoped lang="sass">
.grid
  display: grid
  grid-template-columns: 21% 1fr
</style>
