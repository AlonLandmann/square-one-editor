export function createNewUnit(type, withParts) {
  if (type === 'heading') {
    return {
      type: 'heading',
      content: '---'
    }
  }
  if (type === 'text') {
    return {
      type: 'text',
      content: '---'
    }
  }
  if (type === 'notion' && !withParts) {
    return {
      type: 'notion',
      content: '---'
    }
  }
  if (type === 'notion' && withParts) {
    return {
      type: 'notion',
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
  if (type === 'definition' && !withParts) {
    return {
      type: 'definition',
      content: '---'
    }
  }
  if (type === 'definition' && withParts) {
    return {
      type: 'definition',
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
  if (type === 'axiom' && !withParts) {
    return {
      type: 'axiom',
      content: '---'
    }
  }
  if (type === 'axiom' && withParts) {
    return {
      type: 'axiom',
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
      content: '---',
      proof: '---'
    }
  }
  if (type === 'theorem' && withParts) {
    return {
      type: 'theorem',
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
  if (type === 'example' && !withParts) {
    return {
      type: 'example',
      content: '---'
    }
  }
  if (type === 'example' && withParts) {
    return {
      type: 'example',
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
  if (type === 'exercise' && !withParts) {
    return {
      type: 'exercise',
      content: '---',
      solution: '---'
    }
  }
  if (type === 'exercise' && withParts) {
    return {
      type: 'exercise',
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
  if (type === 'rule' && !withParts) {
    return {
      type: 'rule',
      content: '---'
    }
  }
  if (type === 'rule' && withParts) {
    return {
      type: 'rule',
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
}
