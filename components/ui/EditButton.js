import css from '@/scss/ui/EditButton.module.scss'

export default function EditButton({ editFormInView, setEditFormInView, reset, noIcon }) {
  function handleToggle() {
    if (editFormInView) {
      reset()
      setEditFormInView(prev => !prev)
    } else {
      setEditFormInView(prev => !prev)
    }
  }

  return (
    <div className={css.container} onClick={handleToggle}>
      {!noIcon && (editFormInView
        ? <i className='bi bi-x-lg'></i>
        : <i className='bi bi-pencil-square'></i>
      )}
    </div>
  )
}