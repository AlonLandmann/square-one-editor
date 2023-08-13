import Unit from '@/components/units/Unit'
import Theorem from '@/components/units/Theorem'
import Exercise from '@/components/units/Exercise'
import unitShape from '@/lib/unitShape'
import css from '@/scss/main/StackUnit.module.scss'

export default function ({ unit, stackIndex, setStack }) {
  function handleRemoveFromStack() {
    setStack(prevStack => ([
      ...prevStack.slice(0, stackIndex),
      ...prevStack.slice(stackIndex + 1)
    ]))
  }

  return (
    <div className={css.container}>
      <div className={css.removeButton} onClick={handleRemoveFromStack}>
        <i className='bi bi-x-lg'></i>
      </div>
      <div className={css.unit}>
        {unitShape(unit.type) === 'main' && <Unit unit={unit} />}
        {unit.type === 'theorem' && <Theorem unit={unit} />}
        {unit.type === 'exercise' && <Exercise unit={unit} />}
      </div>
    </div>
  )
}
