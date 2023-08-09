import { cloneDeep } from 'lodash'

export function stackMechanics(stack, unit) {
  let newStack = cloneDeep(stack)
  let isFirst = false

  for (let i = 0; i < newStack.length; i++) {
    if (newStack[i] && newStack[i].index === unit.index) {
      if (i === 0) {
        isFirst = true
      }

      newStack.splice(i, 1)
    }
  }

  if (!isFirst) {
    newStack.unshift(unit)
  }

  return newStack
}