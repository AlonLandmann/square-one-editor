import { useRouter } from 'next/router'
import { useState } from 'react'
import { createNewSubunit } from '@/lib/createNewSubunit'
import subRefShift from '@/lib/subRefShift'
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

      const resPut = await fetch(`${window.location.origin}/api/${pathName}`, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(subRefShift(updatedModule))
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
    const [dataType, unitIndex, subUnitIndex] = event.dataTransfer.getData('text/plain').split('-')

    if (dataType === 'subUnit' && Number(unitIndex) === index) {
      event.preventDefault()

      const originSubIndex = Number(subUnitIndex)

      try {
        const resGet = await fetch(`${window.location.origin}/api/${pathName}`)
        const jsonGet = await resGet.json()

        let updatedModule = jsonGet.data

        updatedModule.script[index].parts.splice(
          subIndex + 1, 0, updatedModule.script[index].parts[originSubIndex]
        )

        if (originSubIndex <= subIndex) {
          updatedModule.script[index].parts.splice(originSubIndex, 1)
        } else {
          updatedModule.script[index].parts.splice(originSubIndex + 1, 1)
        }

        const resPut = await fetch(`${window.location.origin}/api/${pathName}`, {
          method: 'PUT',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(subRefShift(updatedModule))
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
