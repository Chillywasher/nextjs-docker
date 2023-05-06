import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRates } from '../components/useRates'

export default function Home() {

  const { data, isLoading, error } = useRates()

  return (
    <div className={styles.container}>

      <Head>
        <title>Create Next app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>My Website</h1>

        {!isLoading && (


          <div className={styles.rates}>
            
            

            {data.map((rate, index) =>
              <div key={index} className={styles.rate_box}>{rate.value_inc_vat}</div>
            )}

          </div>

        )}

      </main>

      <footer className={styles.footer}>
        &copy; Chillywasher Productions 2023
      </footer>

    </div>
  )
}
