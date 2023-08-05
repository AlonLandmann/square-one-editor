
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { cloneDeep } from 'lodash'
import Headline from '@/components/parts/Headline'
import Part from '@/components/parts/Part'
import TeX from '@/components/parts/TeX'
import EditButton from '@/components/ui/EditButton'
import EditForm from '@/components/ui/EditForm'
import SubGap from '@/components/ui/SubGap'
import css from '@/scss/units/Notion.module.scss'

export default function Notion({ unit }) {
  const [tex, setTex] = useState(unit.content)
  const [editFormInView, setEditFormInView] = useState(false)

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.withoutForm}>
          <div className={css.withoutButton}>
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
      {unit.parts &&
        <div className={css.parts}>
          {unit.parts.map((part, j) => (
            <div key={uuid()}>
              <Part unit={unit} j={j} />
              <SubGap index={unit.index} subIndex={j} />
            </div>
          ))}
        </div>
      }
    </div>
  )
}