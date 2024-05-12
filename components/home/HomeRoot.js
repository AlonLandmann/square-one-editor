import { v4 as uuid } from 'uuid'
import ModuleBanner from '@/components/home/ModuleBanner'
import css from '@/scss/home/HomeRoot.module.scss'

export default function HomeRoot({ modules }) {
  return (
    <div className={css.root}>
      <div className={css.heading}>Square One Editor</div>
      <div className={css.modules}>
        {modules.map(module => (
          <ModuleBanner key={uuid()} module={module} />
        ))}
      </div>
    </div>
  )
}