import { useRouter } from 'next/router'
import hydrate from '@/lib/hydrate'
import refShift from '@/lib/refShift'
import dehydrate from '@/lib/dehydrate'
import updateModule from '@/lib/updateModule'
import css from '@/scss/ui/DeleteButton.module.scss'

export default function DeleteButton({ unit }) {
  const { query: { pathName } } = useRouter()

  function handleDelete() {
    if (confirm('Are you sure you want to delete this unit?')) {
      updateModule(pathName, module => {
        module = hydrate(module)
        module.script.splice(unit.index, 1)
        module = refShift(module)
        module = dehydrate(module)

        return module
      })
    }
  }

  return (
    <div className={css.container} onClick={handleDelete}></div>
  )
}