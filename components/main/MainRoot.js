import { v4 as uuid } from 'uuid'
import Heading from '@/components/units/Heading'
import Text from '@/components/units/Text'
import Notion from '@/components/units/Notion'
import Definition from '@/components/units/Definition'
import Axiom from '@/components/units/Axiom'
import Theorem from '@/components/units/Theorem'
import Example from '@/components/units/Example'
import Exercise from '@/components/units/Exercise'
import css from '@/scss/main/MainRoot.module.scss'

export default function MainRoot({ script }) {
  return (
    <div className={css.root}>
      {script.map(unit => (
        <div key={uuid()}>
          {unit.type === 'heading' && <Heading unit={unit} />}
          {unit.type === 'text' && <Text unit={unit} />}
          {unit.type === 'notion' && <Notion unit={unit} />}
          {unit.type === 'definition' && <Definition unit={unit} />}
          {unit.type === 'axiom' && <Axiom unit={unit} />}
          {unit.type === 'theorem' && <Theorem unit={unit} />}
          {unit.type === 'example' && <Example unit={unit} />}
          {unit.type === 'exercise' && <Exercise unit={unit} />}
        </div>
      ))}
    </div>
  )
}