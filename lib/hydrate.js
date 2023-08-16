import { cloneDeep } from 'lodash'

export default function hydrate(raw) {
  let module = cloneDeep(raw)
  let number = 1

  module.script.forEach((unit, i) => {
    unit.index = i

    if (unit.type !== 'heading' && unit.type !== 'subheading' && unit.type !== 'text') {
      unit.number = number
      number += 1
    }

    if (unit.parts) {
      unit.parts.forEach((part, j) => {
        part.index = j
      })
    }
  })

  return module
}