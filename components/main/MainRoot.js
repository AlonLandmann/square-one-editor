// import Heading from '@/units/Heading'
// import Text from '@/units/Text'
// import Notion from '@/units/Notion'
// import Definition from '@/units/Definition'
// import Axiom from '@/units/Axiom'
// import Theorem from '@/units/Theorem'
// import Example from '@/units/Example'
// import Exercise from '@/units/Exercise'
import css from '@/scss/main/MainRoot.module.scss'

export default function MainRoot({ script }) {
  return (
    <div className={css.script}>
      {script.map(unit => (
        <div key={unit.index}>
          {/* {unit.type === 'heading' && <Heading unit={unit} />}
          {unit.type === 'text' && <Text unit={unit} />}
          {unit.type === 'notion' && <Notion unit={unit} />}
          {unit.type === 'definition' && <Definition unit={unit} />}
          {unit.type === 'axiom' && <Axiom unit={unit} />}
          {unit.type === 'theorem' && <Theorem unit={unit} />}
          {unit.type === 'example' && <Example unit={unit} />}
          {unit.type === 'exercise' && <Exercise unit={unit} />} */}
          {unit.number} {unit.type}
        </div>
      ))}
    </div>
  )
}