
import Link from 'next/link';
import Image from 'next/image';

import { FeaturePost } from '@components/posts';


const FeatureCard = ({
  posts = []
}) => {

  return (
    <>
      {
        posts.map((post) => (
          <FeaturePost
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))
      }
    </>
  )
}





export default FeatureCard