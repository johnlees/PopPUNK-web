import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PopPUNK-web</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript" src="/spawn_worker.js"></script>
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          PopPUNK web
        </h1>

        <p className={styles.description}>
          <input type="file" id="in-file" />
          <input type="button" onClick={() => onClick()} value="ok" />
        </p>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
