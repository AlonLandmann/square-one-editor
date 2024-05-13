import { useRouter } from 'next/router'
import { useState } from 'react'
import { createNewSubunit } from '@/lib/createNewSubunit'
import subRefShift from '@/lib/subRefShift'
import updateModule from '@/lib/updateModule'
import css from '@/scss/ui/SubGap.module.scss'
import hydrate from '@/lib/hydrate'
import dehydrate from '@/lib/dehydrate'

export default function SubGap({ index, subIndex }) {
  const [hover, setHover] = useState(false)
  const { query: { pathName } } = useRouter()

  function addSubUnit() {
    updateModule(pathName, index, module => {
      const newSubUnit = createNewSubunit(module.script[index].type)

      module = hydrate(module)
      module.script[index].parts.splice(subIndex + 1, 0, newSubUnit)
      module = subRefShift(module)
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
    const [dataType, i, j] = event.dataTransfer.getData('text/plain').split('-')

    if (dataType === 'subUnit' && Number(i) === index) {
      event.preventDefault()

      const originSubIndex = Number(j)

      updateModule(pathName, index, module => {
        module = hydrate(module)
        module.script[index].parts.splice(subIndex + 1, 0, module.script[index].parts[originSubIndex])

        if (originSubIndex <= subIndex) {
          module.script[index].parts.splice(originSubIndex, 1)
        } else {
          module.script[index].parts.splice(originSubIndex + 1, 1)
        }

        module = subRefShift(module)
        module = dehydrate(module)

        return module
      })
    }

    setHover(false)
  }

  return (
    <div
      className={`${css.container} ${hover ? css.hovered : ''}`}
      onClick={addSubUnit}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >

    </div>
  )
}
