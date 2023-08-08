import hydrate from '@/lib/hydrate'
import dehydrate from '@/lib/dehydrate'

export default function subRefShift(module) {
  const rehydratedModule = hydrate(dehydrate(module))
  const allShifts = []

  for (let i = 0; i < module.script.length; i++) {
    if (module.script[i].parts) {
      const shifts = []

      for (let n = 1; n <= 1 + module.script[i].parts.length; n++) {
        let shiftInfo = { old: n, new: null }

        for (let j = 0; j < module.script[i].parts.length; j++) {
          if (module.script[i].parts[j].index === n - 1) {
            shiftInfo.new = rehydratedModule.script[i].parts[j].index + 1
          }
        }

        shifts.push(shiftInfo)
      }

      allShifts.push({
        number: module.script[i].number,
        shifts: shifts
      })
    }
  }

  function applyShifts(tex, number, shiftArray) {
    const pattern1 = new RegExp(`§${String(number)}\\.\\d+§`, 'g')
    const pattern2 = new RegExp(`§[^§]*\\,${String(number)}\\.\\d+§`, 'g')
  
    function swap(n) {
      for (let j = 0; j < shiftArray.length; j++) {
        if (shiftArray[j].old === Number(n)) {
          if (shiftArray[j].new !== null) {
            return String(shiftArray[j].new)
          } else {
            return 'NO REF ERROR'
          }
        }
      }
    }
  
    const newTex = tex
      .replace(pattern1, match => `§${String(number)}.${swap(match.match(/\d+§/)[0].slice(0, -1))}§`)
      .replace(pattern2, match => `§${match.match(/[^§]*\,/)[0]}${String(number)}.${swap(match.match(/\d+§/)[0].slice(0, -1))}§`)
  
    return newTex
  }

  rehydratedModule.script.forEach(unit => {
    allShifts.forEach(shiftInfo => {
      if (unit.content) {
        unit.content = applyShifts(unit.content, shiftInfo.number, shiftInfo.shifts)
      }
      if (unit.proof) {
        unit.proof = applyShifts(unit.proof, shiftInfo.number, shiftInfo.shifts)
      }
      if (unit.solution) {
        unit.solution = applyShifts(unit.solution, shiftInfo.number, shiftInfo.shifts)
      }
      if (unit.parts) {
        unit.parts.forEach(part => {
          if (part.content) {
            part.content = applyShifts(part.content, shiftInfo.number, shiftInfo.shifts)
          }
          if (part.proof) {
            part.proof = applyShifts(part.proof, shiftInfo.number, shiftInfo.shifts)
          }
          if (part.solution) {
            part.solution = applyShifts(part.solution, shiftInfo.number, shiftInfo.shifts)
          }
        })
      }
    })
  })

  return rehydratedModule
}