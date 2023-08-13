import Name from '@/components/parts/Name'
import css from '@/scss/parts/Headline.module.scss'

export default function Headline({ unit }) {
  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', `unit-${unit.index}`)
  }

  return (
    <div className={css.container}>
      <div
        className={css.type}
        draggable
        onDragStart={handleDragStart}
      >
        {unit.type.charAt(0).toUpperCase() + unit.type.slice(1)}
      </div>
      <div>{unit.number}</div>
      <Name unit={unit} />
    </div>
  )
}