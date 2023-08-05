export function createNewSubunit(type) {

  if (type === 'notion') {
    return {
      content: '---'
    }
  }
  if (type === 'definition') {
    return {
      content: '---'
    }
  }
  if (type === 'axiom') {
    return {
      content: '---'
    }
  }
  if (type === 'theorem') {
    return {
      content: '---',
      proof: '---'
    }
  }
  if (type === 'example') {
    return {
      content: '---'
    }
  }
  if (type === 'exercise') {
    return {
      content: '---',
      solution: '---'
    }
  }
}
