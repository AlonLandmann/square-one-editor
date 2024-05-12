import { useRouter } from 'next/router'
import { useState } from 'react'
import { createNewUnit } from '@/lib/createNewUnit'
import hydrate from '@/lib/hydrate'
import refShift from '@/lib/refShift'
import updateModule from '@/lib/updateModule'
import css from '@/scss/ui/Gap.module.scss'
import dehydrate from '@/lib/dehydrate'

export default function Gap({ index }) {
  const [hover, setHover] = useState(false)
  const [selectionInView, setSelectionInView] = useState(false)
  const { query: { pathName } } = useRouter()

  function toggleSelection() {
    setSelectionInView(prev => !prev)
  }
  function addUnit(type, withParts = false) {
    updateModule(pathName, index, module => {
      module = hydrate(module)
      module.script.splice(index + 1, 0, createNewUnit(type, withParts))
      module = refShift(module)
      module = dehydrate(module)

      return module
    })
  }
  function handleDragOver(event) {
    event.preventDefault()
    setHover(true)
  }
  function handleDragLeave() {
    setHover(false)
  }
  function handleDrop(event) {
    const [dataType, i] = event.dataTransfer.getData('text/plain').split('-')

    if (dataType === 'unit') {
      event.preventDefault()

      const originIndex = Number(i)

      updateModule(pathName, module => {
        module = hydrate(module)
        module.script.splice(index + 1, 0, module.script[originIndex])

        if (originIndex <= index) {
          module.script.splice(originIndex, 1)
        } else {
          module.script.splice(originIndex + 1, 1)
        }

        module = refShift(module)
        module = dehydrate(module)

        return module
      })
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
            <div className={css.unit} onClick={() => { addUnit('subheading') }}>Sub Heading</div>
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
            <div className={css.unit} onClick={() => { addUnit('rule') }}>Rule</div>
            <div className={css.unit} onClick={() => { addUnit('rule', true) }}>Rule M</div>
            <div className={css.cancel} onClick={toggleSelection}>
              <i className='bi bi-x-lg'></i>
            </div>
          </div>
        </div>
      }
    </div>
  )
}