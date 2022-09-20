export const filterProds = (state) => {
  const filterProducts = state.categoryProducts.filter((e) => {
    const resultCheckbox = []
    const resultInputs = []

    e.fields.forEach((f) => {
      const field = []

      state.copyFilter.forEach((c) => {
        if (c.enTitle == f.enFieldTitle) {
          for (let key in c) {
            if (key != 'enTitle' && key != 'title' && key != 'type') {
              if (c.type) {
                const [min, max] = state.getNumberDataFromQuery(c.enTitle)
                if (f.title <= max && f.title >= min) {
                  resultInputs.push(true)
                } else resultInputs.push(false)
              } else if (c[key].title) field.push(c[key].title)
              else resultInputs.push(true)
            }
          }
          resultCheckbox.push(field.includes(f.title))
          if (field.length == 0) resultCheckbox.push(true)
        }
      })
    })

    // ----------------------------
    const man = []
    const manufactur = state.copyFilter.filter(
      (m) => m.enTitle == 'manufacturer'
    )[0]
    for (let key in manufactur) {
      if (key != 'enTitle' && key != 'title')
        if (manufactur[key].title)
          man.push(manufactur[key].title.toLocaleLowerCase())
    }
    //-----------------------------
    const filter =
      e.price >= state.minP &&
      e.price <= state.maxP &&
      (man.includes(e.manufacturer.toLocaleLowerCase()) || man.length == 0) &&
      e.name.toLocaleLowerCase().includes(state.search.toLocaleLowerCase())

    return (
      filter &&
      resultCheckbox.includes(true) &&
      manufactur &&
      !resultInputs.includes(false)
    )
  })

  return filterProducts
}
