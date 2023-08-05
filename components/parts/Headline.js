import css from '@/scss/parts/Headline.module.scss'

export default function Headline({ unit }) {
  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', `unit-${unit.index}`)
  }

  return (
    <div
      className={css.container}
      draggable
      onDragStart={handleDragStart}
    >
      <div>{unit.type.charAt(0).toUpperCase() + unit.type.slice(1)}</div>
      <div>{unit.number}</div>
    </div>
  )
}