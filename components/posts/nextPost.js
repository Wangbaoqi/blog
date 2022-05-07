import { ArrowLeft, ArrowRight } from "react-feather";
import Link from "next/link";

const NextPost = ({ prev, next }) => {
  const leftPost = prev ? (
    <Link href={prev.slug}>
      <div className="flex flex-col justify-between">
        <div className="flex items-center mb-4 justify-start cursor-pointer">
          <ArrowLeft size={20} />
          <span className="text-sm ml-3">PREV POST</span>
        </div>
        <h3 className="md:text-lg text-base cursor-pointer hover:text-hover-color">
          {prev.title}
        </h3>
      </div>
    </Link>
  ) : null;
  const rightPost = next ? (
    <Link href={next.slug}>
      <div className="flex flex-col justify-between">
        <div className="flex items-center mb-4 justify-end cursor-pointer">
          <span className="text-sm mr-3">NEXT POST</span>
          <ArrowRight size={20} />
        </div>
        <h3 className="md:text-lg text-base cursor-pointer hover:text-hover-color">
          {next.title}
        </h3>
      </div>
    </Link>
  ) : null;

  return (
    <section className="flex justify-between py-8 mt-10">
      {leftPost}
      {rightPost}
    </section>
  );
};

export default NextPost;
