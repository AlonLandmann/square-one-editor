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
import pinToStack from '@/lib/pinToStack'
import css from '@/scss/main/MainRoot.module.scss'

export default function MainRoot({ module }) {
  const [stack, setStack] = useState([])
  const [stackInView, setStackInView] = useState(false)
  const [menuInView, setMenuInView] = useState(true)

  useEffect(() => {
    setStackInView(true)
  }, [stack])

  function handlePin(unit) {
    setStack(prevStack => pinToStack(unit, prevStack))
  }

  return (
    <ModuleProvider value={module}>
      <StackProvider value={[stack, setStack]}>
        {menuInView &&
          <div className={css.menu}>
            <div className={css.menuContent}>
              <div className={css.moduleTitle}>
                {module.displayName}
              </div>
              {module.script.map(unit => (
                <div key={uuid()}>
                  {unit.type === 'heading' &&
                    <div className={css.menuHeading}>
                      {unit.content}
                    </div>
                  }
                  {unit.number &&
                    <div className={css.menuUnitItem} onClick={() => { handlePin(unit) }}>
                      <div className={css.unitNumber}>{unit.number}</div>
                      <div>{unit.type}</div>
                    </div>
                  }
                </div>
              ))}
            </div>
            <div className={css.hideMenu} onClick={() => { setMenuInView(false) }}>
              <i className='bi bi-x-lg'></i>
            </div>
          </div>
        }
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