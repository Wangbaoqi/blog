
import { Header } from '@components/layouts'


export default function HeaderWrapper({
  type = ''
}) {

  if (type == 'post') {
    return <div className='sticky top-0 bg-primary-bg z-1000'>
      <Header />
    </div>
  }

  return (
    <div className='relative md:h-96 h-52 bg-header-cover'>
      <Header />
      <div className=' overflow-hidden block absolute left-0 right-0 bottom-0 h-24 translate-y-1 z-10'>
        <svg className=' absolute left-0 right-0 bottom-0 w-full max-w-full   ' preserveAspectRatio="none" width="1440" height="74" viewBox="0 0 1440 74" >
          <path fill='var(--bg-primary)' d="M456.464 0.0433865C277.158 -1.70575 0 50.0141 0 50.0141V74H1440V50.0141C1440 50.0141 1320.4 31.1925 1243.09 27.0276C1099.33 19.2816 1019.08 53.1981 875.138 50.0141C710.527 46.3727 621.108 1.64949 456.464 0.0433865Z"></path>
        </svg>
      </div>
    </div>
  )
}