import css from '@/scss/ui/EditButton.module.scss'

export default function EditButton({ editFormInView, setEditFormInView, reset }) {
  function handleToggle() {
    if (editFormInView) {
      reset()
      setEditFormInView(prev => !prev)
    } else {
      setEditFormInView(prev => !prev)
    }
  }

  return (
    <div className={css.container} onClick={handleToggle}></div>
  )
}