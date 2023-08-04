import { useState } from 'react'
import TeX from '@/components/parts/TeX'
import EditButton from '@/components/ui/EditButton'
import EditForm from '@/components/ui/EditForm'
import css from '@/scss/parts/Proof.module.scss'

export default function Proof({ unit, proof, update }) {
  const [tex, setTex] = useState(proof)
  const [editFormInView, setEditFormInView] = useState(false)

  return (
    <div className={css.container}>
      <div className={css.withoutForm}>
        <div className={css.withoutButton}>
          <div className={css.heading}>Proof</div>
          <TeX tex={tex} />
          <div className={css.qed}>Q.E.D.</div>
        </div>
        <EditButton
          editFormInView={editFormInView}
          setEditFormInView={setEditFormInView}
          reset={() => { setTex(proof) }}
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