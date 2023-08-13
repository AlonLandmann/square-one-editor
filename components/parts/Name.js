import { useRouter } from 'next/router'
import { useState } from 'react'
import { cloneDeep } from 'lodash'
import updateModule from '@/lib/updateModule'
import css from '@/scss/parts/Name.module.scss'

export default function Name({ unit }) {
  const [name, setName] = useState(unit.name)
  const [inFocus, setInFocus] = useState(false)
  const { query: { pathName } } = useRouter()

  function handleChange(event) {
    setName(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault()

    updateModule(pathName, module => {
      module.script[unit.index] = {
        ...cloneDeep(unit),
        name: name
      }

      return module
    })
  }
  
  return (
    <form
      className={css.container}
      onSubmit={handleSubmit}
      onMouseEnter={() => { setInFocus(true) }}
      onMouseLeave={() => { setInFocus(false) }}
    >
      <input
        id='name'
        type='text'
        value={name}
        onChange={handleChange}
        autoComplete='off'
      />
      {inFocus &&
        <button type='submit'>Edit Name</button>
      }
    </form>
  )
}