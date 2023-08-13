import unitShape from '@/lib/unitShape'

export function createNewUnit(type, withParts) {
  if (unitShape(type) === 'simple') {
    return {
      type: type,
      content: '---'
    }
  }
  if (unitShape(type) === 'main' && !withParts) {
    return {
      type: type,
      name: '---',
      content: '---'
    }
  }
  if (unitShape(type) === 'main' && withParts) {
    return {
      type: type,
      name: '---',
      content: '---',
      parts: [
        {
          content: '---'
        },
        {
          content: '---'
        }
      ]
    }
  }
  if (type === 'theorem' && !withParts) {
    return {
      type: 'theorem',
      name: '---',
      content: '---',
      proof: '---'
    }
  }
  if (type === 'theorem' && withParts) {
    return {
      type: 'theorem',
      name: '---',
      content: '---',
      parts: [
        {
          content: '---',
          proof: '---'
        },
        {
          content: '---',
          proof: '---'
        }
      ]
    }
  }
  if (type === 'exercise' && !withParts) {
    return {
      type: 'exercise',
      name: '---',
      content: '---',
      solution: '---'
    }
  }
  if (type === 'exercise' && withParts) {
    return {
      type: 'exercise',
      name: '---',
      content: '---',
      parts: [
        {
          content: '---',
          solution: '---'
        },
        {
          content: '---',
          solution: '---'
        }
      ]
    }
  }
}
