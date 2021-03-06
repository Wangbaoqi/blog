import Link from "next/link";

import { Link as LinkIcon, ExternalLink } from 'react-feather';

const PostLink = ({
  href = '',
  ...rest
}) => {

  if(!href) return <span className="" {...rest}></span>

  const inter = href.startsWith('http');
  const anchor = href.startsWith('#');
  const acls = 'text-code-color hover:underline hover:underline-offset-4 px-1 font-medium font-mono'

  if (anchor) {
    return (
      <a className="absolute bottom-3 -left-8 top-26 opacity-0 transition-opacity group-hover:text-anchor-color group-hover:opacity-100" href={href} {...rest}>
        <LinkIcon size={20} className='text-anchor-color opacity-100'/>
      </a>
    )
  }

  if (inter) {
    return (
      <a className={acls} target='_blank' href={href} {...rest} >
        {rest.children}
      </a>
    )
  }

  return (
    href ? 
    <Link href={href}>
      <a className={acls} {...rest}/>
    </Link> : <a {...rest} className={acls} />
  )
}

export default PostLink