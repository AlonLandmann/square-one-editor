import { useState } from 'react'
import { cloneDeep } from 'lodash'
import TeX from '@/components/parts/TeX'
import EditButton from '@/components/ui/EditButton'
import EditForm from '@/components/ui/EditForm'
import css from '@/scss/units/Text.module.scss'

export default function Text({ unit }) {
  const [tex, setTex] = useState(unit.content)
  const [editFormInView, setEditFormInView] = useState(false)

  return (
    <div className={css.container}>
      <div className={css.withoutForm}>
        <div className={css.withoutButton}>
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
  )
}