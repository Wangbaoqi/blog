import { Footer, HeaderWrapper, Header  } from '@components/layouts';

export default function Layout({ children, type }) {
  return (
    <>
      <div className="min-h-screen">
        <Header />

        <HeaderWrapper type={ type }/>
        <main className='max-w-screen-xl mx-auto lg:px-10'>{children}</main>
      </div>
      <Footer />
    </>
  )
}
