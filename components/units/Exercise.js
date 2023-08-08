import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { cloneDeep } from 'lodash'
import Headline from '@/components/parts/Headline'
import Subexercise from '@/components/parts/Subexercise'
import Solution from '@/components/parts/Solution'
import TeX from '@/components/parts/TeX'
import EditForm from '@/components/ui/EditForm'
import EditButton from '@/components/ui/EditButton'
import DeleteButton from '@/components/ui/DeleteButton'
import SubGap from '@/components/ui/SubGap'
import css from '@/scss/units/Exercise.module.scss'

export default function Exercise({ unit }) {
  const [tex, setTex] = useState(unit.content)
  const [editFormInView, setEditFormInView] = useState(false)
  const [solutionInView, setSolutionInView] = useState(false)

  function toggleSolution() {
    setSolutionInView(prev => !prev)
  }

  return (
    <div className={css.container}>
      <div className={css.withoutSolution}>
        <div className={css.withoutDeleteButton}>
          
        <div className={css.withoutForm}>
          <div
            className={`${css.withoutEditButton} ${!unit.parts ? css.interactive : ''}`}
            onClick={toggleSolution}
          >
            <Headline unit={unit} />
            <TeX tex={tex} />
          </div>
          <EditButton
            editFormInView={editFormInView}
            setEditFormInView={setEditFormInView}
            reset={() => { setTex(unit.content) }}
          />
        </div>
        {editFormInView &&
          <EditForm
            unit={unit}
            tex={tex}
            setTex={setTex}
            update={(u, tex) => (
              { ...cloneDeep(u), content: tex }
            )}
          />
        }
        </div>
        <DeleteButton
          unit={unit}
        />
      </div>
      {!unit.parts && solutionInView &&
        <Solution
          unit={unit}
          solution={unit.solution}
          update={(u, tex) => (
            { ...cloneDeep(u), solution: tex }
          )}
        />
      }
      {unit.parts &&
        <div className={css.parts}>
          {unit.parts.map((part, j) => (
            <div key={uuid()}>
              <Subexercise unit={unit} j={j} />
              <SubGap index={unit.index} subIndex={j} />
            </div>
          ))}
        </div>
      }
    </div>
  )
}