import { v4 as uuid } from 'uuid'
import Header from '@/components/home/Header'
import ModuleBanner from '@/components/home/ModuleBanner'
import css from '@/scss/home/HomeRoot.module.scss'

export default function HomeRoot({ modules }) {
  return (
    <div className={css.root}>
      <Header />
      <div className={css.modules}>
        {modules.map(module => (
          <ModuleBanner key={uuid()} module={module} />
        ))}
      </div>
    </div>
  )
}