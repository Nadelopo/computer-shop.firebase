<script setup>
const categories = [
  {
    id: 'processors',
    img: 'https://firebasestorage.googleapis.com/v0/b/vue-3-crud-a165e.appspot.com/o/products%2Fprocessors.webp?alt=media&token=981b919e-f9bd-4605-9d57-21ced193a745',
    name: 'Процессоры',
  },
  {
    id: 'videocards',
    img: 'https://firebasestorage.googleapis.com/v0/b/vue-3-crud-a165e.appspot.com/o/products%2Fvideocards.webp?alt=media&token=c3f082c0-c54c-4079-b886-12d96bbd813c',
    name: 'Видеокарты',
  },
  {
    id: 'motherboard',
    img: 'https://firebasestorage.googleapis.com/v0/b/vue-3-crud-a165e.appspot.com/o/products%2FmotherBoard.webp?alt=media&token=3d0ed79a-094a-447a-b260-b57fc5626ee5',
    name: 'Материнские платы',
  },
  {
    id: 'memory',
    img: 'https://firebasestorage.googleapis.com/v0/b/vue-3-crud-a165e.appspot.com/o/products%2Fmemory.webp?alt=media&token=f9771f21-3e5f-4540-b4ba-e8c6cae786a7',
    name: 'Оперативная память',
  },
  {
    id: 'cooling',
    img: 'https://firebasestorage.googleapis.com/v0/b/vue-3-crud-a165e.appspot.com/o/products%2Fohlad.webp?alt=media&token=06c9a5c4-9e70-4122-a41d-7b855cb037c1',
    name: 'Система охлаждения',
  },
  {
    id: 'ssd',
    img: 'https://firebasestorage.googleapis.com/v0/b/vue-3-crud-a165e.appspot.com/o/products%2Fssd.webp?alt=media&token=93aa11e5-6eca-45f9-a45a-0f925ec3252f',
    name: 'SSD',
  },
  {
    id: 'hdd',
    img: 'https://firebasestorage.googleapis.com/v0/b/vue-3-crud-a165e.appspot.com/o/products%2Fhdd.webp?alt=media&token=35c3c853-026d-424d-a4ce-7721af0a3d5d',
    name: 'HDD',
  },
  {
    id: 'power',
    img: 'https://firebasestorage.googleapis.com/v0/b/vue-3-crud-a165e.appspot.com/o/products%2Fbp.webp?alt=media&token=af3f5135-8e9b-4273-b1b6-c8bd8fc1c36f',
    name: 'Блоки питания',
  },
]
</script>

<template>
  <div class="container">
    <div class="grid">
      <div v-for="category in categories" :key="category.img">
        <div
          class="lev"
          @click="
            $router.push({
              name: 'CategoryPage',
              params: { category: category.id },
            })
          "
        >
          <div class="flip flex justify-center items-center">
            <div class="flip__body">
              <div class="flip__front">
                <div class="kart">
                  <img :src="category.img" alt="" />
                </div>
              </div>
              <div class="flip__back">
                <div class="text-center text1">{{ category.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.lev
  width: 100%
  height: 200px
  background-color: #fff
  border-radius: 8px
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 26%)
  vertical-align: middle
  display: inline-grid
  align-content: center
  cursor: pointer

.text1
  font-weight: 600
  font-size: 20px

.kart
  max-width: 255px
  min-width: 200px
  height: 150px
  justify-content: center
  align-items: center
  display: flex
  overflow: hidden

.flip__body
  position: relative
  width: 150px
  height: 150px
  transition: all 0.6s ease 0s
  transform-style: preserve-3d

.flip__front,
.flip__back
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  display: flex
  justify-content: center
  align-items: center

.flip__front
  z-index: 2
  transform: rotateY(0deg)
  backface-visibility: hidden

.flip__back
  transform: rotateY(-180deg)

.flip:hover .flip__body
  transform: rotateY(-180deg)

.grid
  display: grid
  grid-template-columns: repeat(4, 1fr)
  gap: 40px
</style>
