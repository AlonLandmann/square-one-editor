import { useModule } from '@/lib/ModuleProvider'
import { useStack } from '@/lib/StackProvider'
import { stackMechanics } from '@/lib/stackMechanics'
import css from '@/scss/parts/Reference.module.scss'

export default function Reference({ children, refNum, subNum }) {
  const module = useModule()
  const [stack, setStack] = useStack()

  const unit = module.script.filter(u => u.number === refNum)[0]

  
  function handleClick() {
    setStack(stackMechanics(stack, unit))
  }

  return (
    <span className={css.container} onClick={handleClick}>
      {children}
    </span>
  )
}