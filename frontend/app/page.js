import Footer from '@components/Footer'
import '@styles/globals.css'


function Home() {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head-text text-center'>
        Bienvenue sur IN<span className='text-primary-orange'>DATA
          <br />
          🤗
          <br />

        </span>
        Interprétation experte de vos données
        <br />
        <span className='primary_gradiant text-center'> Explorez le plein potentiel de vos données
          grâce à notre plateforme d'intelligence artificielle.</span>
      </h1>
      <p className='desc text-center'>INDATA transforme vos données brutes en insights exploitables</p>

    <Footer/>
    </section>
  )
}

export default Home