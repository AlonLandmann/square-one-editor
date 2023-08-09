import { useModule } from '@/lib/ModuleProvider'
import { useStack } from '@/lib/StackProvider'
import pinToStack from '@/lib/pinToStack'
import css from '@/scss/parts/Reference.module.scss'
import { cloneDeep } from 'lodash'

export default function Reference({ children, refNum, subNum }) {
  const module = useModule()
  const [stack, setStack] = useStack()

  let unit = cloneDeep(module.script.filter(u => u.number === refNum)[0])

  if (subNum || subNum === 0) {
    unit.selectedSub = subNum - 1
  } else {
    delete unit.selectedSub
  }

  
  function handleClick() {
    setStack(prevStack => pinToStack(unit, prevStack))
  }

  return (
    <span className={css.container} onClick={handleClick}>
      {children}
    </span>
  )
}