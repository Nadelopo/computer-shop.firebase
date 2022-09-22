import { useRoute } from 'vue-router'

export const getNumberDataFromQuery = (where, rout) => {
  let route
  if (rout) route = rout
  else route = useRoute()
  const query = route.query
  let min
  let max
  if (query[where]) {
    min = Number(query[where].split('-')[0])
    max = Number(query[where].split('-')[1])
  } else {
    min = 0
    max = 300000
  }
  console.log(min, max)
  return [min, max]
}
