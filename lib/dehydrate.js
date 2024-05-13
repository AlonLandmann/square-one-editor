import { cloneDeep } from 'lodash'

export default function dehydrate(raw) {
  let module = cloneDeep(raw)

  module.script.forEach(unit => {
    delete unit.index
    delete unit.number
    delete unit.chapter
    delete unit.section

    if (unit.parts) {
      unit.parts.forEach(part => {
        delete part.index
      })
    }
  })

  return module
}