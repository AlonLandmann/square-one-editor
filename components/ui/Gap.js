import { useRouter } from 'next/router'
import { useState } from 'react'
import { createNewUnit } from '@/lib/createNewUnit'
import css from '@/scss/ui/Gap.module.scss'

export default function Gap({ index }) {
  const [hover, setHover] = useState(false)
  const [selectionInView, setSelectionInView] = useState(false)
  const { query: { pathName } } = useRouter()

  function toggleSelection() {
    setSelectionInView(prev => !prev)
  }

  async function addUnit(type, withParts = false) {
    try {
      const resGet = await fetch(`${window.location.origin}/api/${pathName}`)
      const jsonGet = await resGet.json()

      let updatedModule = jsonGet.data

      updatedModule.script.splice(index + 1, 0, createNewUnit(type, withParts))

      // XX refshift

      const resPut = await fetch(`${window.location.origin}/api/${pathName}`, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedModule)
      })

      const jsonPut = await resPut.json()

      if (jsonPut.success) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error) 
    }
  }

  function handleDragOver(event) {
    // event.preventDefault()
    // setHover(true)
  }
  function handleDragLeave() {
    // setHover(false)
  }
  function handleDrop(event) {
    // const data = event.dataTransfer.getData('text/plain').split('-')

    // if (data[0] === 'unit') {
    //   event.preventDefault()

    //   const originIndex = Number(data[1])

    //   let updatedScript = cloneDeep(script)

    //   updatedScript.splice(unitIndex + 1, 0, updatedScript[originIndex])

    //   if (originIndex <= unitIndex) {
    //     updatedScript.splice(originIndex, 1)
    //   } else {
    //     updatedScript.splice(originIndex + 1, 1)
    //   }

    //   updateScript(refShift(updatedScript))
    // }

    // setHover(false)
  }

  return (
    <div className={css.container}>
      <div
        className={`${css.highlight} ${hover ? css.hovered : ''}`}
        onClick={toggleSelection}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >

      </div>
      {selectionInView &&
        <div className={css.selectionContainer}>
          <div className={css.selectionContent}>
            <div className={css.unit} onClick={() => { addUnit('heading') }}>Heading</div>
            <div className={css.unit} onClick={() => { addUnit('text') }}>Text</div>
            <div className={css.unit} onClick={() => { addUnit('notion') }}>Notion</div>
            <div className={css.unit} onClick={() => { addUnit('notion', true) }}>Notion M</div>
            <div className={css.unit} onClick={() => { addUnit('definition') }}>Definition</div>
            <div className={css.unit} onClick={() => { addUnit('definition', true) }}>Definition M</div>
            <div className={css.unit} onClick={() => { addUnit('axiom') }}>Axiom</div>
            <div className={css.unit} onClick={() => { addUnit('axiom', true) }}>Axiom M</div>
            <div className={css.unit} onClick={() => { addUnit('theorem') }}>Theorem</div>
            <div className={css.unit} onClick={() => { addUnit('theorem', true) }}>Theorem M</div>
            <div className={css.unit} onClick={() => { addUnit('example') }}>Example</div>
            <div className={css.unit} onClick={() => { addUnit('example', true) }}>Example M</div>
            <div className={css.unit} onClick={() => { addUnit('exercise') }}>Exercise</div>
            <div className={css.unit} onClick={() => { addUnit('exercise', true) }}>Exercise M</div>
            <div className={css.cancel} onClick={toggleSelection}>
              <i className='bi bi-x-lg'></i>
            </div>
          </div>
        </div>
      }
    </div>
  )
}