import { useState } from 'react'
import { cloneDeep } from 'lodash'
import TeX from '@/components/parts/TeX'
import Proof from '@/components/parts/Proof'
import EditButton from '@/components/ui/EditButton'
import EditForm from '@/components/ui/EditForm'
import css from '@/scss/parts/Subtheorem.module.scss'

export default function Subtheorem({ unit, j }) {
  const [tex, setTex] = useState(unit.parts[j].content)
  const [editFormInView, setEditFormInView] = useState(false)
  const [proofInView, setProofInView] = useState(false)

  function toggleProof() {
    setProofInView(prev => !prev)
  }

  return (
    <div className={css.container}>
      <div className={css.withoutProof}>
        <div className={css.withoutForm}>
          <div className={css.withoutButton} onClick={toggleProof}>
            <div className={css.number}>{j + 1}</div>
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
                  { content: tex, proof: u.parts[j].proof },
                  ...cloneDeep(u).parts.slice(j + 1, u.parts.length)
                ]
              }
            )}
          />
        }
      </div>
      {proofInView &&
        <Proof
          unit={unit}
          proof={unit.parts[j].proof}
          update={(u, tex) => (
            {
              ...cloneDeep(u),
              parts: [
                ...cloneDeep(u).parts.slice(0, j),
                { content: u.parts[j].content, proof: tex },
                ...cloneDeep(u).parts.slice(j + 1, u.parts.length)
              ]
            }
          )}
        />
      }
    </div>
  )
}