import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import StackUnit from '@/components/main/StackUnit'
import Gap from '@/components/ui/Gap'
import Heading from '@/components/units/Heading'
import Text from '@/components/units/Text'
import Notion from '@/components/units/Notion'
import Definition from '@/components/units/Definition'
import Axiom from '@/components/units/Axiom'
import Theorem from '@/components/units/Theorem'
import Example from '@/components/units/Example'
import Exercise from '@/components/units/Exercise'
import ModuleProvider from '@/lib/ModuleProvider'
import StackProvider from '@/lib/StackProvider'
import css from '@/scss/main/MainRoot.module.scss'

export default function MainRoot({ module }) {
  const [stack, setStack] = useState([])
  const [stackInView, setStackInView] = useState(false)

  useEffect(() => {
    setStackInView(true)
  }, [stack])

  return (
    <ModuleProvider value={module}>
      <StackProvider value={[stack, setStack]}>
        <div className={css.script}>
          {module.script.map(unit => (
            <div key={uuid()}>
              {unit.type === 'heading' && <Heading unit={unit} />}
              {unit.type === 'text' && <Text unit={unit} />}
              {unit.type === 'notion' && <Notion unit={unit} />}
              {unit.type === 'definition' && <Definition unit={unit} />}
              {unit.type === 'axiom' && <Axiom unit={unit} />}
              {unit.type === 'theorem' && <Theorem unit={unit} />}
              {unit.type === 'example' && <Example unit={unit} />}
              {unit.type === 'exercise' && <Exercise unit={unit} />}
              <Gap index={unit.index} />
            </div>
          ))}
        </div>
        {stackInView && stack.length &&
          <div className={css.stack}>
            <div className={css.stackContent}>
              {stack.map((unit, i) => (
                <StackUnit key={uuid()}
                  unit={unit}
                  stackIndex={i}
                  setStack={setStack}
                />
              ))}
            </div>
            <div className={css.hideStack} onClick={() => { setStackInView(false) }}>
              <i className='bi bi-x-lg'></i>
            </div>
          </div>
        }
      </StackProvider>
    </ModuleProvider>
  )
}