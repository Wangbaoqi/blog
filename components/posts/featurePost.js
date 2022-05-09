import { Avatar, Img } from '@components/ui';
import Link from 'next/link';
import { ChevronRight } from 'react-feather';
import { categoryTheme } from "@utils/tagtheme";
import Image from 'next/image';
export default function FeaturePost({
  mode,
  title,
  coverImage,
  category,
  date,
  excerpt,
  author = {},
  slug,
}) {
  const postCls = mode == 'col' ? 'md:flex-col' : '';
  const imgHBox = mode == 'col' ? 'h-f-card-c' : 'h-f-card';
  const bgCls = mode == 'col' ? 'bg-second-bg' : 'dark:bg-post-cover';

  const rightContent = (
    <div className='px-4 md:px-8 py-4 relative  '>
      <h3 className="md:text-2xl text-xl font-Sriracha mb-8 leading-snug">
        <Link href={`/posts/${slug}`}>
          <a className="hover:text-hover-color">{title}</a>
        </Link>
      </h3>
      <p className="text-sm md:text-tiny leading-loose mt-3 pr-5 line-clamp-3 ">{excerpt}</p>
      <div className="relative text-sm mt-8 pt-8 flex items-center">
        <p className='absolute top-0 left-0 w-2/3 h-px bg-border-color'></p>
        <Avatar name={author.name} picture={author.picture} />
        <span className='text-xs font-Sriracha'>{date}</span>
      </div>
      <div className='absolute flex justify-center items-center right-4 bottom-4 md:right-14 md:bottom-6 md:h-16 h-12 w-12 md:w-16 rounded-full border-border-color border cursor-pointer'>
        <Link href={`/posts/${slug}`}>
          <a>
            <ChevronRight size={20} className=''/>
          </a>
        </Link>
      </div>
    </div>
  )


  const bottomContent = (
    <div className='px-6 pb-4 relative '>
      <div className='py-4 mt-2 border-b border-b-border-color flex items-center '>
        <Avatar name={author.name} picture={author.picture} />
        <span className='text-xs font-Sriracha h-5 flex items-center'>{date}</span>
      </div>
      <h3 className="md:text-xl text-base my-6 leading-snug">
        <Link href={`/posts/${slug}`}>
          <a className="hover:text-second-color font-Sriracha ">{title}</a>
        </Link>
      </h3>
      <p className="text-sm md:text-sm leading-loose pr-2 line-clamp-2 ">{excerpt}</p>
    </div>
  )
  return (
    <div className={`shadow-3xl rounded-2xl  md:min-h-f-card overflow-hidden ${bgCls}`}>
      <div className={`md:flex ${postCls}`}>
        <div className="relative md:shrink-0">
          <div className={`relative md:w-f-card w-full ${imgHBox}`}>
            <Image
              className={`object-cover`}
              src={coverImage}
              layout='fill'
              priority
            />
          </div>
          <span className={` text-pre font-Sriracha rounded absolute top-4 left-4 px-2 py-1 cursor-pointer ${categoryTheme[category]}`}>{ category }</span>
        </div>
        { mode == 'col' ? bottomContent : rightContent }
      </div>
    </div>
  )
}
