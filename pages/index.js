import Head from 'next/head'
import dynamic from 'next/dynamic'

export default function Home() {

  const Map = dynamic(
    () => import('../components/Map'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  );

  return (
    <div data-theme="desert" className="h-screen">
      <Head>
        <title>cyberSW Demo</title>
        <meta name="description" content="A cyberSW demo application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className="navbar shadow-lg bg-neutral text-neutral-content">
          <div className="px-2 mx-2 navbar-start">
            <span className="text-lg font-bold">
              cyberSW Demo
            </span>
          </div>
          <div className="hidden px-2 mx-2 navbar-center lg:flex">
            <div className="flex items-stretch">
              <a className="btn btn-ghost btn-sm rounded-btn">
                Explore
              </a>
              <a className="btn btn-ghost btn-sm rounded-btn">
                Analyze
              </a>
            </div>
          </div>
          <div className="navbar-end">
            <a className="btn btn-ghost btn-sm rounded-btn">
              User Panel
            </a>
            <a className="btn btn-ghost btn-sm rounded-btn">
              Logout
            </a>
          </div>
        </div>
      </header>
      <main className="flex">
        <div className="flex-auto">
          <Map />
        </div>
        <div className="w-96">
          <div className="p-5">
            <h2>Explore</h2>
            <div>Future filters</div>
          </div>
          <footer className="p-5 footer bg-neutral text-neutral-content">
            <div>
              <span className="footer-title">&copy; cyberSW {new Date().getFullYear()}</span>
              <a className="link link-hover" href="https://cybersw.org/faq.html">FAQs</a>
              <a className="link link-hover" href="https://cybersw.org/terms.html">Terms of Use</a>
              <a className="link link-hover" href="https://cybersw.org/privacy.html">Privacy Policy</a>
              <a className="link link-hover" href="https://cybersw.org/cookies.html">Cookie Policy</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
