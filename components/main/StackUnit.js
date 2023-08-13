import Unit from '@/components/units/Unit'
import Theorem from '@/components/units/Theorem'
import Exercise from '@/components/units/Exercise'
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
        {unit.type === 'notion' && <Unit unit={unit} />}
        {unit.type === 'definition' && <Unit unit={unit} />}
        {unit.type === 'axiom' && <Unit unit={unit} />}
        {unit.type === 'theorem' && <Theorem unit={unit} />}
        {unit.type === 'example' && <Unit unit={unit} />}
        {unit.type === 'exercise' && <Exercise unit={unit} />}
        {unit.type === 'rule' && <Unit unit={unit} />}
      </div>
    </div>
  )
}
