<script setup>
import ProductsBlock from '../components/CategoryProducts/ProductsList.vue'
import Filters from '../components/CategoryProducts/Filters.vue'
</script>

<template>
  <div class="container grid"><Filters /> <ProductsBlock /></div>
</template>

<style scoped lang="sass">
.grid
  // padding:0 100px
  display: grid
  grid-template-columns: 25% 1fr
</style>
