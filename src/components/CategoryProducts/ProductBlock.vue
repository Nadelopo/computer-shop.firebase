<script setup>
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
      <div class="click">
        <div class="mb-4 text-lg">{{ item.name }}</div>
        <div
          v-for="field in item.fields"
          :key="field.fieldTitle"
          class="flex flex-col gap-2"
        >
          <div class="flex gap-2" v-if="field.visible">
            <div>{{ field.fieldTitle }}</div>
            <div>{{ field.title }} {{ field?.units }}</div>
          </div>
        </div>
      </div>
    </div>
    <div>{{ item.price }} ₽</div>
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

.click
  cursor: pointer
  transition: 1s
  &:hover
    transition: .3s
    color: var(--color-text)
</style>
