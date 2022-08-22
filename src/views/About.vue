<script setup>
import SmileSvg from '@/icons/smile.svg'
import BriefcaseSvg from '@/icons/briefcase.svg'
import WorkerSvg from '@/icons/worker.svg'

const list = [
  {
    svg: SmileSvg,
    head: 'Для клиентов',
    text: 'Наши клиенты – в центре всего, что мы делаем, Доверие - главное. Мы строим долгосрочные отношения, Во всём, чем занимаемся, стремимся быть экспертами, Открыты для предложений и улучшений.',
  },
  {
    svg: BriefcaseSvg,
    head: 'Для партнеров',
    text: 'Прозрачность - основа совместного бизнеса, Работаем, соблюдая этику бизнеса, Уважаем другие мнения и интересы, Выполняем обязательства и берем ответственность за свои решения, Нетерпимы к коррупции.',
  },
  {
    svg: WorkerSvg,
    head: 'Для сотрудников',
    text: 'CMP - территория личной и коллективной самореализации, Мы - одна команда, Уважаем мнение и интересы людей, Ценим свободу, смелость и ответственность.',
  },
]
</script>

<template>
  <div class="container">
    <div>
      <div class="flex justify-center mb-6">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/computer-planet-remake.appspot.com/o/another%2Flogo__black.png?alt=media&token=446db4d7-21c8-47ab-a895-ee4feb6f869e"
          width="460"
          alt=""
        />
      </div>
      <h1 class="text-4xl text-center mb-14">
        «CMP» - один из лидеров рынка по продаже цифровой и бытовой техники
      </h1>
      <div class="list">
        <div class="li" v-for="(item, index) in list" :key="index">
          <Component :is="item.svg" width="30" />
          <div>
            <div class="font-medium text-2xl mb-3">{{ item.head }}</div>
            <div class="text-2xl text-justify">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.list
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 40px
  .li
    display: grid
    grid-template-columns: 40px 1fr
</style>
