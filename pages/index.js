import Link from "next/link";
import { getFeaturePost, getRecentPost, getGroupByCategory } from "@lib/mdx";
import { Layout } from '@components/layouts';
import { FeatureWrapper, RecentWrapper } from '@components/posts';


export default function BlogList({ featurePosts, categoryGroup, recentPost }) {

  return (
    <>
      <Layout type='page'>
        <FeatureWrapper
          featurePosts={featurePosts}
          categoryGroup={categoryGroup}
        />
        <RecentWrapper
          recentPosts={recentPost}
        />
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  // const posts = await getAllPosts();
  const featurePosts = await getFeaturePost();
  const categoryGroup = await getGroupByCategory('category');
  const recentPost = await getRecentPost();
  return {
    props: { featurePosts, categoryGroup, recentPost },
  };
};