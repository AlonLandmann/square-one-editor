import { cloneDeep } from 'lodash'

// export function stackMechanics(stack, unit) {
//   let newStack = cloneDeep(stack)
//   let isFirst = false

//   for (let i = 0; i < newStack.length; i++) {
//     if (newStack[i] && newStack[i].index === unit.index) {
//       if (i === 0) {
//         isFirst = true
//       }

//       newStack.splice(i, 1)
//     }
//   }

//   if (!isFirst) {
//     newStack.unshift(unit)
//   }

//   return newStack
// }

export default function pinToStack(unit, prevStack) {
  let stack = cloneDeep(prevStack)
  let wasFirst = false
  let didContainOtherSubs = false

  for (let i = 0; i < stack.length; i++) {
    if (stack[i] && stack[i].index === unit.index) {
      if (i === 0) {
        wasFirst = true

        if (
          typeof unit.selectedSub === 'undefined' &&
          typeof stack[i].selectedSub === 'number'
        ) {
          didContainOtherSubs = true
        }
        if (
          typeof unit.selectedSub === 'number' &&
          typeof stack[i].selectedSub === 'undefined'
        ) {
          didContainOtherSubs = true
        }
        if (
          typeof unit.selectedSub === 'number' &&
          typeof stack[i].selectedSub === 'number' &&
          unit.selectedSub !== stack[i].selectedSub
        ) {
          didContainOtherSubs = true
        }
      }

      stack.splice(i, 1)
    }
  }

  if (!wasFirst || didContainOtherSubs) {
    stack.unshift(unit)
  }

  return stack
}