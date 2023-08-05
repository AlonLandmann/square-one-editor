import { useState } from 'react'
import css from '@/scss/ui/Gap.module.scss'

export default function Gap({ index }) {
  const [hover, setHover] = useState(false)
  const [selectionInView, setSelectionInView] = useState(false)
  // const script = useScript()

  function toggleSelection() {
    setSelectionInView(prev => !prev)
  }
  function addUnit(event) {
    // const typeToAdd = event.target.innerHTML

    // let updatedScript = cloneDeep(script)

    // updatedScript.splice(unitIndex + 1, 0, createEmptyUnit(typeToAdd))
    // updateScript(refShift(updatedScript))
    // setSelectionInView(false)
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
            <div className={css.unit} onClick={addUnit}>Heading</div>
            <div className={css.unit} onClick={addUnit}>Text</div>
            <div className={css.unit} onClick={addUnit}>Notion</div>
            <div className={css.unit} onClick={addUnit}>Notion M</div>
            <div className={css.unit} onClick={addUnit}>Definition</div>
            <div className={css.unit} onClick={addUnit}>Definition M</div>
            <div className={css.unit} onClick={addUnit}>Axiom</div>
            <div className={css.unit} onClick={addUnit}>Axiom M</div>
            <div className={css.unit} onClick={addUnit}>Theorem</div>
            <div className={css.unit} onClick={addUnit}>Theorem M</div>
            <div className={css.unit} onClick={addUnit}>Example</div>
            <div className={css.unit} onClick={addUnit}>Example M</div>
            <div className={css.unit} onClick={addUnit}>Exercise</div>
            <div className={css.unit} onClick={addUnit}>Exercise M</div>
            <div className={css.cancel} onClick={toggleSelection}>
              <i className='bi bi-x-lg'></i>
            </div>
          </div>
        </div>
      }
    </div>
  )
}