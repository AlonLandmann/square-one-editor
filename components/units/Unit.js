import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { cloneDeep } from 'lodash'
import Headline from '@/components/parts/Headline'
import Part from '@/components/parts/Part'
import TeX from '@/components/parts/TeX'
import EditButton from '@/components/ui/EditButton'
import EditForm from '@/components/ui/EditForm'
import DeleteButton from '@/components/ui/DeleteButton'
import SubGap from '@/components/ui/SubGap'
import css from '@/scss/units/Unit.module.scss'

export default function Unit({ unit }) {
  const [tex, setTex] = useState(unit.content)
  const [editFormInView, setEditFormInView] = useState(false)

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.withoutDeleteButton}>
          <div className={css.withoutForm}>
            <div className={css.withoutEditButton}>
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
      {unit.parts &&
        <div className={css.parts}>
          {unit.parts.map((part, j) => {
            if (unit.selectedSub === undefined || unit.selectedSub === j) {
              return (
                <div key={uuid()}>
                  <Part unit={unit} j={j} />
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