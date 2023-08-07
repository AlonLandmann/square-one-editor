import { useRouter } from 'next/router'
import TextareaAutosize from 'react-textarea-autosize'
import updateModule from '@/lib/updateModule'
import css from '@/scss/ui/EditForm.module.scss'

export default function EditForm({ unit, tex, setTex, update }) {
  const { query: { pathName } } = useRouter()

  function handleChange(event) {
    setTex(event.target.value)
  }
  function handleSubmit() {
    updateModule(pathName, module => {
      module.script[unit.index] = update(module.script[unit.index], tex)

      return module
    })
  }
  
  return (
    <div className={css.container}>
      <form className={css.form}>
        <TextareaAutosize
          value={tex}
          minRows={5}
          maxRows={15}
          spellCheck={false}
          onChange={handleChange}
        />
      </form>
      <div className={css.submit} onClick={handleSubmit}>
        <i className='bi bi-check-lg'></i>
      </div>
    </div>
  )
}

