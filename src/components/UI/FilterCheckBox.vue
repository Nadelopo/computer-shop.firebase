<script setup>
import { useRouter, useRoute } from 'vue-router'
import { defineProps, ref } from 'vue'

const router = useRouter()
const route = useRoute()
const props = defineProps({
  id: [String, Number],
  name: [String, Number],
  dop: String,
  title: String,
  enTitle: String,
})
let listener = ref('')
for (let key in route.query) {
  if (key == props.enTitle) {
    listener.value = route.query[key]
      ? route.query[key].includes(String(props.name))
      : ''
  }
}

const emit = defineEmits(['update:modelValue'])

const updateValue = () => {
  emit(`update:modelValue`, !listener.value ? props.name : null)
  let query = []
  if (!listener.value) {
    if (route.query[props.enTitle]) {
      query.push(route.query[props.enTitle], props.name)
    } else query.push(props.name)
  } else {
    if (typeof route.query[props.enTitle] == 'string') {
      query = null
    } else {
      const s = route.query[props.enTitle].filter((e) => e != props.name)
      if (s.length == 0) query = null
      else query = s
    }
  }
  router.push({
    query: {
      ...route.query,
      [props.enTitle]: query,
    },
  })
}
</script>

<template>
  <div>
    <div class="flex m-auto">
      <div>
        <label :for="id" class="label-cbx">
          <input
            :id="id"
            type="checkbox"
            class="invisible"
            v-model="listener"
            @input="updateValue"
          />
          <div class="checkbox">
            <svg width="20px" height="20px" viewBox="0 0 20 20">
              <path
                d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
              ></path>
              <polyline points="4 11 8 15 16 6"></polyline>
            </svg>
          </div>
        </label>
      </div>
      <div>{{ name }} {{ dop }}</div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.label-cbx
  user-select: none
  cursor: pointer
  margin-bottom: 0
  input:checked
    & + .checkbox
      border-color: #26a69a
      svg
        path
          fill: #26a69a
        polyline
          stroke-dashoffset: 0
  &:hover
    .checkbox
      svg
        path
          stroke-dashoffset: 0

  .checkbox
    position: relative
    top: 2px
    float: left
    margin-right: 8px
    width: 20px
    height: 20px
    border: 2px solid #C8CCD4
    border-radius: 3px
    svg
      position: absolute
      top: -2px
      left: -2px
      path
        fill: none
        stroke: #26a69a
        stroke-width: 2
        stroke-linecap: round
        stroke-linejoin: round
        stroke-dasharray: 71px
        stroke-dashoffset: 71px
        transition: all .6s ease
      polyline
        fill: none
        stroke: #FFF
        stroke-width: 2
        stroke-linecap: round
        stroke-linejoin: round
        stroke-dasharray: 18px
        stroke-dashoffset: 18px
        transition: all .3s ease

  > span
    pointer-events: none
    vertical-align: middle

.w
  @media (max-width: 991px) and (min-width: 768px)
    width: 70%
</style>
