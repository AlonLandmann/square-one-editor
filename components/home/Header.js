import css from '@/scss/home/Header.module.scss'

export default function Header() {
  return (
    <div className={css.container}>
      <div className={css.logo}><i className='bi bi-1-square'></i></div>
      <div className={css.heading}>Welcome to Square One</div>
      <div className={css.text}>We study mathematics from the ground up! Select any of the modules to continue.</div>
    </div>
  )
}