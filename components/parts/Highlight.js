import { v4 as uuid } from 'uuid'
import TeX from '@/components/parts/TeX'
import css from '@/scss/parts/Highlight.module.scss'

export default function Highlight({ tex }) {
  return (
    <div className={css.container}>
      {tex.split('||||').map(row => (
        <div key={uuid()} className={css.row}>
          {row.split('|||').map(item => (
            <TeX key={uuid()} tex={item} />
          ))}
        </div>
      ))}
    </div>
  )
}