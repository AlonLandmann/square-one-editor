import Head from 'next/head'
import MainRoot from '@/components/main/MainRoot'
import Module from '@/db/models/Module'
import dbConnect from '@/db/dbConnect'
import hydrate from '@/lib/hydrate'

export default function Main({ moduleJson }) {
  return (
    <div>
      <Head>
        <title>Square One</title>
        <link rel='icon' type='image/x-icon' href='/favicon.svg'></link>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <main>
        <MainRoot module={JSON.parse(moduleJson)} />
      </main>
    </div>
  )
}

export async function getServerSideProps({ query: { pathName } }) {
  dbConnect()

  const raw = await Module.findOne({ pathName: pathName }, { _id: 0 })
  const module = hydrate(raw)

  return {
    props: {
      moduleJson: JSON.stringify(module)
    }
  }
}