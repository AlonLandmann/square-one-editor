import Notion from '@/components/units/Notion'
import Definition from '@/components/units/Definition'
import Axiom from '@/components/units/Axiom'
import Theorem from '@/components/units/Theorem'
import Example from '@/components/units/Example'
import Exercise from '@/components/units/Exercise'
import Rule from '@/components/units/Rule'
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
        {unit.type === 'notion' && <Notion unit={unit} />}
        {unit.type === 'definition' && <Definition unit={unit} />}
        {unit.type === 'axiom' && <Axiom unit={unit} />}
        {unit.type === 'theorem' && <Theorem unit={unit} />}
        {unit.type === 'example' && <Example unit={unit} />}
        {unit.type === 'exercise' && <Exercise unit={unit} />}
        {unit.type === 'rule' && <Rule unit={unit} />}
      </div>
    </div>
  )
}
