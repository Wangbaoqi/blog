
import Link from 'next/link';

const Title = ({
  title = '',
  showAll = false,
  allHref = '/'
}) => {

  return (
    <div className="flex justify-between items-center px-3 py-8 md:px-0 text-anchor-color cursor-pointer">
      <h2 className=" text-2xl md:text-3xl ">{ title }</h2>
      {
        showAll ? (
          <Link href={allHref}>
            <a className='flex items-center text-tiny '>
              <span className='mr-3'>View All</span>
            </a>
          </Link>
        ) : ''
      }
  </div>
  )
}


export default Title