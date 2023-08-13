import { useState } from 'react'
import { cloneDeep } from 'lodash'
import TeX from '@/components/parts/TeX'
import Solution from '@/components/parts/Solution'
import EditForm from '@/components/ui/EditForm'
import EditButton from '@/components/ui/EditButton'
import DeleteButton from '@/components/ui/DeleteButton'
import css from '@/scss/parts/Subexercise.module.scss'

export default function Subexercise({ unit, j }) {
  const [tex, setTex] = useState(unit.parts[j].content)
  const [editFormInView, setEditFormInView] = useState(false)
  const [solutionInView, setSolutionInView] = useState(false)

  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', `subUnit-${unit.index}-${j}`)
  }
  function toggleSolution() {
    setSolutionInView(prev => !prev)
  }

  return (
    <div className={css.container}>
      <div className={css.withoutSolution}>
        <div className={css.withoutDeleteButton}>
          <div className={css.withoutForm}>
            <div className={css.withoutEditButton} onClick={toggleSolution}>
              <div className={css.number} draggable onDragStart={handleDragStart}>{j + 1}</div>
              <div className={css.content}><TeX tex={tex} /></div>
            </div>
            <EditButton
              editFormInView={editFormInView}
              setEditFormInView={setEditFormInView}
              reset={() => { setTex(unit.parts[j].content) }}
              noIcon
            />
          </div>
          {editFormInView &&
            <EditForm
              unit={unit}
              tex={tex}
              setTex={setTex}
              update={(u, tex) => (
                {
                  ...cloneDeep(u),
                  parts: [
                    ...cloneDeep(u).parts.slice(0, j),
                    { content: tex, solution: u.parts[j].solution },
                    ...cloneDeep(u).parts.slice(j + 1, u.parts.length)
                  ]
                }
              )}
            />
          }
        </div>
        <DeleteButton unit={unit} j={j} />
      </div>
      {solutionInView &&
        <Solution
          unit={unit}
          solution={unit.parts[j].solution}
          update={(u, tex) => (
            {
              ...cloneDeep(u),
              parts: [
                ...cloneDeep(u).parts.slice(0, j),
                { content: u.parts[j].content, solution: tex },
                ...cloneDeep(u).parts.slice(j + 1, u.parts.length)
              ]
            }
          )}
        />
      }
    </div>
  )
}