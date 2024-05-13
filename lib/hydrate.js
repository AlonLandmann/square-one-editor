import { cloneDeep } from 'lodash'

export default function hydrate(raw) {
  let module = cloneDeep(raw)

  let chapter = 0
  let section = 0
  let number = 1

  module.script.forEach((unit, i) => {
    // add index
    unit.index = i

    // add sub-index
    if (unit.parts) {
      unit.parts.forEach((part, j) => {
        part.index = j
      })
    }

    // add core number
    if (unit.type !== 'heading' && unit.type !== 'subheading' && unit.type !== 'text') {
      unit.number = number
      number += 1
    }

    // add chapter and section indicators
    if (unit.type === 'heading') {
      chapter += 1
      section = 0
    } else if (unit.type === 'subheading') {
      section += 1
    }

    unit.chapter = chapter
    unit.section = section
  })

  return module
}