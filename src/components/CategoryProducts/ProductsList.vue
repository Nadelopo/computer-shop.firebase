<script setup>
import { filtersStore } from '@/stores/filterStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import ProductBlock from './ProductBlock.vue'
import Search from './Search.vue'
import SkeletonProduct from './SkeletonProduct.vue'

const { filterProducts } = storeToRefs(filtersStore())

// const create = () => {
//   createProducts({
//     fields: [
//       { title: 'AM4', fieldTitle: 'сокет' },
//       { title: '7', fieldTitle: 'техпроцесс' },
//       { title: 6, fieldTitle: 'количество ядер' },
//       { title: 12, fieldTitle: 'количество потоков' },
//       { title: 3.6, fieldTitle: 'минимальная частота', units: 'ГГц' },
//       {
//         title: 4.2,
//         fieldTitle: 'максимальная частота',
//         units: 'ГГц',
//       },
//     ],
//     name: 'Процессор AMD Ryzen 5 3600',
//     description:
//       '6-ядерный процессор AMD Ryzen 5 3600 OEM порадует высоким уровнем производительности подавляющее большинство пользователей. Устройство будет уверенно себя чувствовать в составе мощной игровой системы. Базовая частота процессора равна 3600 МГц. Турбочастота – 4200 МГц. Важной особенностью процессора является очень большой объем кэша третьего уровня: величина этого показателя равна 32 МБ. Объем кэша L2 – 3 МБ. Процессор AMD Ryzen 5 3600 OEM не имеет встроенного графического ядра. Модель совместима с памятью DDR4, объем которой может достигать 128 ГБ. Минимально допустимая частота оперативной памяти – 1600 МГц. Максимально допустимая частота вдвое выше – 3200 МГц. Процессор не укомплектован системой охлаждения. Выбор кулера предоставлен производителем пользователю. Несмотря на высокий уровень эксплуатационных параметров, процессор отличается незначительным (лишь 65 Вт) показателем TDP. Для установки устройства используется сокет AM4',
//     img: 'https://firebasestorage.googleapis.com/v0/b/vue-3-crud-a165e.appspot.com/o/products%2Fr3600.webp?alt=media&token=6b2a5060-bb3d-4b1e-9f4a-78ddc2189931',
//     category: 'processors',
//     manufacturer: 'intel',
//     warranty: 24,
//     price: 23390,
//   })
// }
const loading = ref(false)
onMounted(() => {
  setTimeout(() => (loading.value = true), 5000)
})
</script>

<template>
  <div>
    <div class="wrapper">
      <Search />
      <div class="flex flex-col gap-4">
        <template v-if="!filterProducts.length && loading">
          <div class="flex justify-center">
            <div class="text-xl text-center font-semibold pt-8 w-4/6">
              К сожалению, по вашему запросу ничего не найдено. Проверьте
              правильность ввода или попробуйте изменить запрос.
            </div>
          </div>
        </template>
        <template v-else-if="!filterProducts.length">
          <div v-for="i in 5" :key="i">
            <SkeletonProduct />
          </div>
        </template>
        <div v-else v-for="(item, index) in filterProducts" :key="index">
          <ProductBlock :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

.wrapper
  padding: 6px 12px
</style>
