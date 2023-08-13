import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { cloneDeep } from 'lodash'
import Headline from '@/components/parts/Headline'
import Subtheorem from '@/components/parts/Subtheorem'
import Proof from '@/components/parts/Proof'
import TeX from '@/components/parts/TeX'
import EditForm from '@/components/ui/EditForm'
import EditButton from '@/components/ui/EditButton'
import DeleteButton from '@/components/ui/DeleteButton'
import SubGap from '@/components/ui/SubGap'
import css from '@/scss/units/Theorem.module.scss'

export default function Theorem({ unit }) {
  const [tex, setTex] = useState(unit.content)
  const [editFormInView, setEditFormInView] = useState(false)
  const [proofInView, setProofInView] = useState(false)

  function toggleProof() {
    setProofInView(prev => !prev)
  }

  return (
    <div className={css.container}>
      <div className={css.withoutProof}>
        <div className={css.withoutDeleteButton}>
          <div className={css.withoutForm}>
            <div
              className={`${css.withoutEditButton} ${!unit.parts ? css.interactive : ''}`}
              onClick={toggleProof}
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
        <DeleteButton unit={unit} />
      </div>
      {!unit.parts && proofInView &&
        <Proof
          unit={unit}
          proof={unit.proof}
          update={(u, tex) => (
            { ...cloneDeep(u), proof: tex }
          )}
        />
      }
      {unit.parts &&
        <div className={css.parts}>
          {unit.parts.map((part, j) => {
            if (unit.selectedSub === undefined || unit.selectedSub === j) {
              return (
                <div key={uuid()}>
                  <Subtheorem unit={unit} j={j} />
                  <SubGap index={unit.index} subIndex={j} />
                </div>
              )
            }
          })}
        </div>
      }
    </div>
  )
}