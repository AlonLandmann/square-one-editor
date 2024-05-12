import { useRouter } from 'next/router'
import TeX from '@/components/parts/TeX'
import css from '@/scss/home/ModuleBanner.module.scss'

export default function ModuleBanner({ module }) {
  const router = useRouter()
  
  return (
    <div className={css.container} onClick={() => { router.push(module.pathName) }}>
      <div className={css.name}>{module.displayName}</div>
      <div className={css.icon}><TeX tex={module.icon} /></div>
      <div className={css.description}>{module.description}</div>
    </div>
  )
}