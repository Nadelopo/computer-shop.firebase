<script setup>
import CartButton from '../UI/CartButton.vue'
defineProps({
  item: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>
  <div class="card__wrapper">
    <div><img :src="item.img" alt="" /></div>

    <div>
      <div class="cart__link">
        <div class="mb-4 text-lg">{{ item.name }}</div>
        <div
          v-for="field in item.fields"
          :key="field.fieldTitle"
          class="flex flex-col gap-2"
        >
          <div v-if="field.visible" class="flex gap-2">
            <div>{{ field.fieldTitle }}</div>
            <div>{{ field.title }} {{ field?.units }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-y-3">
      <div>{{ item.price }} ₽</div>
      <div><CartButton :product-id="item.id" /></div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.card__wrapper
  background-color: #fff
  transition: 0.4s
  padding: 20px 20px 20px 0
  border-radius: 8px
  padding: 20px 40px
  display: grid
  grid-template-columns: 20% auto 10%
  grid-gap: 40px
  align-items: center
  &:hover
    transition: 0.5s
    box-shadow: rgb(0, 0, 0 , .25) 0px 0px 15px 5px

.cart__link
  cursor: pointer
  transition: 1s
  &:hover
    transition: .3s
    color: var(--color-text)
</style>
