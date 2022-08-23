export const debounce = (fn, ms) => {
  let timeout
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(), ms)
  }
}
