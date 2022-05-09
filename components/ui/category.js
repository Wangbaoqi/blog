import Link from 'next/link';

import { ChevronRight } from 'react-feather';

const Category = ({
  groupList
}) => {

  const cateList = []
  for (const key in groupList) {
    const obj = {};
    obj['key'] = key;
    obj['count'] = groupList[key].length;
    obj['cover'] = groupList[key][0]?.coverImage || '';
    cateList.push(obj);
  }

  return (
    <section className="">
      <h3 className="text-2xl font-Sriracha">Categories</h3>
      {
        cateList.map((cate) => {
          return (
            <Link key={cate.key} href={`/category/${cate.key}`}>
              <div className="relative overflow-hidden rounded-xl bg-second-bg border border-border-color dark:border-0 dark:shadow-3xl mt-5  flex dark:bg-post-cover items-center cursor-pointer">
                <img className="h-70 w-80" src={cate.cover} alt=""/>
                <h5 className=" text-tiny font-Gloria font-medium ml-6">{cate.key}{`(${cate.count})`}</h5>
                <ChevronRight className=' absolute top-1/2 -translate-y-1/2 right-5' size={20}/>
              </div>
            </Link>
            
          )
        })
      }

    </section>
  )
}


export default Category