import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>My Website</h1>

        <h2>Testing Testing 1,2,3</h2>
      </main>

      <footer className={styles.footer}>
        &copy; Chillwasher Productions 2023
      </footer>
    </div>
  )
}
