import { useState } from 'react'
import TeX from '@/components/parts/TeX'
import EditButton from '@/components/ui/EditButton'
import EditForm from '@/components/ui/EditForm'
import css from '@/scss/parts/Solution.module.scss'

export default function Solution({ unit, solution, update }) {
  const [tex, setTex] = useState(solution)
  const [editFormInView, setEditFormInView] = useState(false)

  return (
    <div className={css.container}>
      <div className={css.withoutForm}>
        <div className={css.withoutButton}>
          <div className={css.heading}>Solution</div>
          <TeX tex={tex} />
        </div>
        <EditButton
          editFormInView={editFormInView}
          setEditFormInView={setEditFormInView}
          reset={() => { setTex(solution) }}
        />
      </div>
      {editFormInView &&
        <EditForm
          unit={unit}
          tex={tex}
          setTex={setTex}
          update={update}
        />
      }
    </div>
  )
}