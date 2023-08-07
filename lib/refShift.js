import hydrate from '@/lib/hydrate'
import dehydrate from '@/lib/dehydrate'

export default function refShift(module) {
  const rehydratedModule = hydrate(dehydrate(module))
  const shifts = []

  for (let n = 1; n <= module.script.length; n++) {
    let shiftInfo = { old: n, new: null }

    for (let i = 0; i < module.script.length; i++) {
      if (module.script[i].number === n) {
        shiftInfo.new = rehydratedModule.script[i].number
      }
    }

    shifts.push(shiftInfo)
  }

  function applyShifts(tex, shiftArray) {
    const pattern1 = /§\d+§/g
    const pattern2 = /§\d+\.\d+§/g
    const pattern3 = /§[^§]*\,\d+§/g
    const pattern4 = /§[^§]*\,\d+\.\d+§/g
  
    function swap(n) {
      for (let i = 0; i < shiftArray.length; i++) {
        if (shiftArray[i].old === Number(n)) {
          if (shiftArray[i].new !== null) {
            return String(shiftArray[i].new)
          } else {
            return 'NO REF ERROR'
          }
        }
      }
    }
  
    const newTex = tex
      .replace(pattern1, match => `§${swap(match.slice(1, -1))}§`)
      .replace(pattern2, match => `§${swap(match.match(/§\d+/)[0].slice(1))}.${match.match(/\d+§/)[0]}`)
      .replace(pattern3, match => `§${match.match(/[^§]*\,/)[0]}${swap(match.match(/\d+§/)[0].slice(0, -1))}§`)
      .replace(pattern4, match => `§${match.match(/[^§]*\,/)[0]}${swap(match.match(/\,\d+/)[0].slice(1))}.${match.match(/\d+§/)[0]}`)
  
    return newTex
  }

  rehydratedModule.script.forEach(unit => {
    if (unit.content) {
      unit.content = applyShifts(unit.content, shifts)
    }
    if (unit.proof) {
      unit.proof = applyShifts(unit.proof, shifts)
    }
    if (unit.solution) {
      unit.solution = applyShifts(unit.solution, shifts)
    }
    if (unit.parts) {
      unit.parts.forEach(part => {
        if (part.content) {
          part.content = applyShifts(part.content, shifts)
        }
        if (part.proof) {
          part.proof = applyShifts(part.proof, shifts)
        }
        if (part.solution) {
          part.solution = applyShifts(part.solution, shifts)
        }
      })
    }
  })

  return rehydratedModule
}