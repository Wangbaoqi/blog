
import { ChevronLeft, ChevronRight } from 'react-feather';
import { pagenationInit } from '@utils/pagenation';
import { memo, useState } from 'react';
import Link from 'next/link'



const PageNation = ({
  type,
  pagination,
  setPagenationChange
}) => {
  const { currentPage = 1, totalPages } = pagination;
  const pageList = pagenationInit(currentPage, totalPages);

  const prePage = currentPage - 1

  const algoType = type ? `${type}/` : ''

  return (
    <div className="flex justify-center space-x-1">
     
      <button title="previous" type="button" className="inline-flex items-center justify-center hover:bg-hover-bg w-10 h-10 py-0 bg-second-bg rounded-md shadow">
        <ChevronLeft size={16} />
      </button>
      {
        pageList.map((page, idx) => {
          const aCls = page === currentPage ? 'bg-hover-bg' : '';
          const isDisable = typeof page !== 'number';
          return (
            <Link href={`/algorithm/${algoType}page/${page}`} key={idx}>
              <button
                disabled={isDisable}
                onClick={() => setPagenationChange(page)}
                type="button"
                className={`inline-flex items-center justify-center w-10 h-10 text-sm hover:bg-hover-bg font-semibold rounded shadow bg-second-bg ${aCls}`}
                >
                  {page}
              </button>
            </Link>
          )
        })
      }
      <button title="next" type="button" className="inline-flex items-center justify-center hover:bg-hover-bg w-10 h-10 py-0 bg-second-bg rounded-md shadow">
        <ChevronRight size={16} />
      </button>
    </div>
  )
}


export default memo(PageNation)