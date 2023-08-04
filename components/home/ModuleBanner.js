import { useRouter } from 'next/router'
import css from '@/scss/home/ModuleBanner.module.scss'

export default function ModuleBanner({ module }) {
  const router = useRouter()
  
  return (
    <div className={css.container} onClick={() => { router.push(module.pathName) }}>
      <div className={css.icon}>
        <i className={`bi bi-${module.icon}`}></i>
      </div>
      <div className={css.name}>{module.displayName}</div>
      <div className={css.description}>{module.description}</div>
    </div>
  )
}