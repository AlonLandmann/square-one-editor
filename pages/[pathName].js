import Head from 'next/head'
import MainRoot from '@/components/main/MainRoot'
import Module from '@/db/models/Module'
import dbConnect from '@/db/dbConnect'
import prepareScript from '@/lib/prepareScript'

export default function Main({ scriptJson }) {
  return (
    <div>
      <Head>
        <title>Square One</title>
        <link rel='icon' type='image/x-icon' href='/favicon.svg'></link>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <main>
        <MainRoot script={JSON.parse(scriptJson)} />
      </main>
    </div>
  )
}

export async function getServerSideProps({ query: { pathName } }) {
  dbConnect()

  const raw = await Module.findOne({ pathName: pathName }, { _id: 0 })
  const script = prepareScript(raw)

  return {
    props: {
      scriptJson: JSON.stringify(script)
    }
  }
}