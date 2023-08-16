export default function unitShape(unitType) {
  switch (unitType) {
    case 'heading': return 'simple'
    case 'subheading': return 'simple'
    case 'text': return 'simple'
    case 'notion': return 'main'
    case 'definition': return 'main'
    case 'axiom': return 'main'
    case 'theorem': return 'dropDown'
    case 'example': return 'main'
    case 'exercise': return 'dropDown'
    case 'rule': return 'main'
    default: return undefined
  }
}