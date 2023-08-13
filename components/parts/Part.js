import { useState } from 'react'
import { cloneDeep } from 'lodash'
import TeX from '@/components/parts/TeX'
import EditForm from '@/components/ui/EditForm'
import EditButton from '@/components/ui/EditButton'
import DeleteButton from '@/components/ui/DeleteButton'
import css from '@/scss/parts/Part.module.scss'

export default function Part({ unit, j }) {
  const [tex, setTex] = useState(unit.parts[j].content)
  const [editFormInView, setEditFormInView] = useState(false)

  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', `subUnit-${unit.index}-${j}`)
  }

  return (
    <div className={css.container}>
      <div className={css.withoutDeleteButton}>
        <div className={css.withoutForm}>
          <div className={css.withoutEditButton}>
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
                  { content: tex },
                  ...cloneDeep(u).parts.slice(j + 1, u.parts.length)
                ]
              }
            )}
          />
        }
      </div>
      <DeleteButton unit={unit} j={j} />
    </div>
  )
}