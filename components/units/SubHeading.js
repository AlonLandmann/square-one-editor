import { useState } from 'react'
import { cloneDeep } from 'lodash'
import TeX from '@/components/parts/TeX'
import EditButton from '@/components/ui/EditButton'
import EditForm from '@/components/ui/EditForm'
import DeleteButton from '../ui/DeleteButton'
import css from '@/scss/units/SubHeading.module.scss'

export default function SubHeading({ unit }) {
  const [tex, setTex] = useState(unit.content)
  const [editFormInView, setEditFormInView] = useState(false)

  return (
    <div className={css.container}>
      <div className={css.withoutDeleteButton}>
        <div className={css.withoutForm}>
          <div className={css.withoutEditButton}>
            <div className={css.number}>{unit.chapter}.{unit.section}</div>
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
  )
}