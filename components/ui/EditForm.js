import TextareaAutosize from 'react-textarea-autosize'
import { useRouter } from 'next/router'
import prepareScript from '@/lib/prepareScript'
import css from '@/scss/ui/EditForm.module.scss'

export default function EditForm({ unit, tex, setTex, update }) {
  const { query: { pathName } } = useRouter()

  function handleChange(event) {
    setTex(event.target.value)
  }

  async function handleSubmit() {
    try {
      const resGet = await fetch(`${window.location.origin}/api/${pathName}`)
      const jsonGet = await resGet.json()

      if (!jsonGet.success) {
        return
      }

      let updatedCourse = jsonGet.data
      let script = prepareScript(updatedCourse)

      for (let i = 0; i < script.length; i += 1) {
        if (script[i].index === unit.index) {
          updatedCourse.script[i] = update(script[i], tex)
        }
      }

      const resPut = await fetch(`${window.location.origin}/api/${pathName}`, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCourse)
      })

      const jsonPut = await resPut.json()

      if (jsonPut.success) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error) 
    }
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

