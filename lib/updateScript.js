import toast from 'react-hot-toast'
import dehydrateScript from '@/lib/dehydrateScript'

export function updateScript(updatedScript, router) {
  async function executeApiCalls() {
    try {
      const res = await fetch(`${window.location.origin}/api`, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Calculus-I',
          script: dehydrateScript(updatedScript)
        })
      })

      const json = await res.json()

      if (json.success) {
        return true
      }

      return false
    } catch (error) {
      console.log(error)

      return false
    }
  }

  executeApiCalls().then(success => {
    if (success) {
      if (router) {
        toast.success('Successfully updated script')
        router.push('/', undefined, { scroll: false })
      } else {
        window.location.replace('/')
      }
    } else {
      toast.error('Something went wrong')
    }
  })
}
