import { useRouter } from 'next/router'
import { useState } from 'react'
import { createNewSubunit } from '@/lib/createNewSubunit'
import css from '@/scss/ui/SubGap.module.scss'

export default function SubGap({ index, subIndex }) {
  const [hover, setHover] = useState(false)
  const { query: { pathName } } = useRouter()

  async function handleAdd() {
    try {
      const resGet = await fetch(`${window.location.origin}/api/${pathName}`)
      const jsonGet = await resGet.json()

      let updatedModule = jsonGet.data
      let type = updatedModule.script[index].type

      updatedModule.script[index].parts.splice(subIndex + 1, 0, createNewSubunit(type))

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
  function handleDragLeave(event) {
    // setHover(false)
  }
  function handleDrop(event) {
    // const data = event.dataTransfer.getData('text/plain').split('-')

    // if (data[0] === 'subtheorem') {
    //   event.preventDefault()

    //   const originIndex = Number(data[1])

    //   let updatedScript = cloneDeep(script)

    //   updatedScript[unitIndex].subtheorems.splice(
    //     subtheoremIndex + 1, 0, updatedScript[unitIndex].subtheorems[originIndex]
    //   )

    //   if (originIndex <= subtheoremIndex) {
    //     updatedScript[unitIndex].subtheorems.splice(originIndex, 1)
    //   } else {
    //     updatedScript[unitIndex].subtheorems.splice(originIndex + 1, 1)
    //   }

    //   updateScript(subRefShift(updatedScript))
    // }

    // setHover(false)
  }

  return (
    <div
      className={`${css.container} ${hover ? css.hovered : ''}`}
      onClick={handleAdd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >

    </div>
  )
}
