import { v4 as uuid } from 'uuid'
import TeX from '@/components/parts/TeX'
import css from '@/scss/parts/Derivation.module.scss'

export default function Derivation({ tex }) {
  const lines = tex.split('||')
  const table = lines.map(line => line.split('|'))

  return (
    <div className={css.container}>
      {table.map((line, i) => (
        <div key={uuid()} className={css.line}>
          <div><TeX tex={`[${line[0]}]`} /></div>
          <div><TeX tex={`[(${i + 1})]`} /></div>
          <div><TeX tex={`${line[1]}`} /></div>
          <div><TeX tex={`${line[2]}`} /></div>
        </div>
      ))}
    </div>
  )
}