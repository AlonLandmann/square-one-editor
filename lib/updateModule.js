export default async function updateModule(pathName, updateFunction) {
  try {
    const resGet = await fetch(`${window.location.origin}/api/${pathName}`)
    const jsonGet = await resGet.json()

    const resPut = await fetch(`${window.location.origin}/api/${pathName}`, {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(updateFunction(jsonGet.data))
    })

    const jsonPut = await resPut.json()

    if (jsonPut.success) {
      window.location.reload()
    }
  } catch (error) {
    console.log(error)
  }
}