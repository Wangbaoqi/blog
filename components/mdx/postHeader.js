import {Avatar} from '@components/ui';

import { Clock, Type } from 'react-feather'

const PostHeader = ({
  title = '',
  date = '',
  author = {},
  category = '',
  tags = [],
  coverImage = '',
  readTime = {}
}) => {

  return (
    <header className="">
      <div className="flex justify-between items-center py-4">
        <h3 className="">{ category }</h3>
      </div>
      <div className="mt-5 mb-3 rounded-md overflow-hidden">
        <img className="" src={ coverImage } alt="" srcSet="" />
      </div>
      <div className="flex items-center justify-start py-8 ">
        {/* <Avatar {...author} /> */}
        <div className='flex items-center'>
          <span className="flex items-center mr-3">
            {
              tags.map((t, id) => (
                <strong key={id}>{t}</strong>
              ))
            }
          </span>
          <span className='mr-3'>{date}</span>
          <span className='flex items-center mr-3'>
            <Clock size={18} />
            <strong className='ml-1'>{readTime.text}</strong>
          </span>
          <span className='flex items-center mr-3 h-5'>
            <Type size={18} />
            <strong  className='ml-1'>{readTime.words}</strong>
          </span>
        </div>
      </div>
      <h1 className='my-6 text-xl md:text-3xl font-bold bg-header-color font-Sriracha bg-clip-text title'>{ title }</h1>
    </header>
  )
}


export default PostHeader;