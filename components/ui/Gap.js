import { useRouter } from 'next/router'
import { useState } from 'react'
import { createNewUnit } from '@/lib/createNewUnit'
import hydrate from '@/lib/hydrate'
import refShift from '@/lib/refShift'
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

      let updatedModule = hydrate(jsonGet.data)

      updatedModule.script.splice(index + 1, 0, createNewUnit(type, withParts))

      const resPut = await fetch(`${window.location.origin}/api/${pathName}`, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(refShift(updatedModule))
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
    event.preventDefault()
    setHover(true)
  }
  function handleDragLeave() {
    setHover(false)
  }

  async function handleDrop(event) {
    const [dataType, unitIndex] = event.dataTransfer.getData('text/plain').split('-')

    if (dataType === 'unit') {
      event.preventDefault()

      const originIndex = Number(unitIndex)

      try {
        const resGet = await fetch(`${window.location.origin}/api/${pathName}`)
        const jsonGet = await resGet.json()

        let updatedModule = hydrate(jsonGet.data)

        updatedModule.script.splice(index + 1, 0, updatedModule.script[originIndex])

        if (originIndex <= index) {
          updatedModule.script.splice(originIndex, 1)
        } else {
          updatedModule.script.splice(originIndex + 1, 1)
        }

        const resPut = await fetch(`${window.location.origin}/api/${pathName}`, {
          method: 'PUT',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(refShift(updatedModule))
        })

        const jsonPut = await resPut.json()

        if (jsonPut.success) {
          window.location.reload()
        }
      } catch (error) {
        console.log(error)
      }
    }

    setHover(false)
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