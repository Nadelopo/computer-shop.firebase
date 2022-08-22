<script setup>
import DeliverySvg from '@/icons/delivery.svg'

const list = [
  'товар будет доставлен в согласованный с вами день, Вы будете предупреждены по телефону за час до доставки',
  'товар будет доставлен по указанному Вами адресу',
  'временной интервал 10:00 - 20:00',
  'стоимость доставки 350 р',
  'вы можете изменить адрес и дату доставки товара, позвонив в контактный центр не позднее, чем за день до даты доставки',
  'если вы хотите получить доставку бесконтактно, сообщите курьеру, когда он с вами свяжется',
  'если обратная телефонная связь с клиентом отсутствует, доставка товара переносится на следующий день',
  'при получении товара обязательно проверьте его',
]
</script>

<template>
  <div class="container">
    <div class="px-16">
      <div class="main">
        <div><DeliverySvg class="max-w-lg" /></div>
        <div>
          <div class="flex mb-16">
            <div class="number mr-4">1</div>
            <div class="text-3xl font-medium">
              Оформите заказ на сайте, выбрав доставку.
            </div>
          </div>
          <div class="flex mb-16">
            <div class="number mr-4">2</div>
            <div class="text-3xl font-medium">
              Стоимость доставки - 350 рублей.
            </div>
          </div>
          <div class="flex">
            <div class="number mr-4">3</div>
            <div class="text-3xl font-medium">
              Оплатите заказ и наслаждайтесь новой покупкой.
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 class="font-medium text-4xl mb-8">Правила доставки</h1>
        <div>
          <div v-for="item in list" :key="item" class="flex items-center mb-5">
            <div class="before"></div>
            <div class="li">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.main
  display: grid
  grid-template-columns: 40% 1fr
  grid-gap: 20px
  align-items: center
  svg
    width: 100%

.number
  width: 30px
  height: 30px
  background: var(--back-main)
  border-radius: 50px
  color: #fff
  display: flex
  align-items: center
  justify-content: center
  font-size: 24px

.before
  border-radius: 50px
  background: var(--back-main)
  width: 10px
  height: 10px
  margin-right: 10px

.li
  font-size: 22px
</style>
