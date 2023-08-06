import css from '@/scss/parts/Reference.module.scss'

export default function Reference({ children }) {
  return (
    <span className={css.container}>
      {children}
    </span>
  )
}