import Head from 'next/head'
import HomeRoot from '@/components/home/HomeRoot'
import Module from '@/db/models/Module'
import dbConnect from '@/db/dbConnect'

export default function Home({ modulesJson }) {
  return (
    <div>
      <Head>
        <title>Square One</title>
        <link rel='icon' type='image/x-icon' href='/favicon.svg'></link>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <main>
        <HomeRoot modules={JSON.parse(modulesJson)} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  dbConnect()

  const raw = await Module.find({}, { _id: 0, script: 0 }).sort({ id: 1 })

  return {
    props: {
      modulesJson: JSON.stringify(raw)
    }
  }
}