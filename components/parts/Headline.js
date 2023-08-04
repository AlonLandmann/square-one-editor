import css from '@/scss/parts/Headline.module.scss'

export default function Headline({ unit }) {
  return (
    <div className={css.container}>
      <div>{unit.type.charAt(0).toUpperCase() + unit.type.slice(1)}</div>
      <div>{unit.number}</div>
    </div>
  )
}