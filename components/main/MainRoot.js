import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import StackUnit from '@/components/main/StackUnit'
import Gap from '@/components/ui/Gap'
import Heading from '@/components/units/Heading'
import SubHeading from '@/components/units/SubHeading'
import Text from '@/components/units/Text'
import Unit from '@/components/units/Unit'
import Theorem from '@/components/units/Theorem'
import Exercise from '@/components/units/Exercise'
import unitShape from '@/lib/unitShape'
import ModuleProvider from '@/lib/ModuleProvider'
import StackProvider from '@/lib/StackProvider'
import pinToStack from '@/lib/pinToStack'
import css from '@/scss/main/MainRoot.module.scss'

export default function MainRoot({ module }) {
  const [stack, setStack] = useState([])
  const [stackInView, setStackInView] = useState(false)
  const [menuInView, setMenuInView] = useState(false)

  useEffect(() => {
    setStackInView(true)
  }, [stack])

  function handlePin(unit) {
    setStack(prevStack => pinToStack(unit, prevStack))
  }
  function toggleMenu() {
    setMenuInView(prev => !prev)
  }
  function toggleStack() {
    setStackInView(prev => !prev)
  }

  return (
    <ModuleProvider value={module}>
      <StackProvider value={[stack, setStack]}>
          <div className={css.menuButton} onClick={toggleMenu}>
            <i className='bi bi-list'></i>
          </div>
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
                    {unit.type === 'subheading' &&
                      <div className={css.menuSubHeading}>
                        {unit.content}
                      </div>
                    }
                    {unit.number &&
                      <div className={css.menuUnitItem} onClick={() => { handlePin(unit) }}>
                        <div className={css.unitNumber}>{unit.number}</div>
                        <div className={css.unitType}>{unit.type.charAt(0).toUpperCase()}</div>
                        <div className={css.unitName}>{unit.name}</div>
                      </div>
                    }
                  </div>
                ))}
              </div>
            </div>
          }
          <div className={css.script}>
            {module.script.map(unit => (
              <div key={uuid()} id={unit.index}>
                {unit.type === 'heading' && <Heading unit={unit} />}
                {unit.type === 'subheading' && <SubHeading unit={unit} />}
                {unit.type === 'text' && <Text unit={unit} />}
                {unitShape(unit.type) === 'main' && <Unit unit={unit} />}
                {unit.type === 'theorem' && <Theorem unit={unit} />}
                {unit.type === 'exercise' && <Exercise unit={unit} />}
                <Gap index={unit.index} />
              </div>
            ))}
          </div>
          {stackInView && stack.length > 0 &&
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
            </div>
          }
          <div className={css.stackButton} onClick={toggleStack}>
            <i className='bi bi-layers'></i>
          </div>
      </StackProvider>
    </ModuleProvider>
  )
}