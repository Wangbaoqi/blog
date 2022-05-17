

import { Zap } from 'react-feather';

const FormatBtn = ({ 
  handleFormat
}) => {


  return (
    <button
      className="text-sm text-third-color h-8 flex justify-center items-center"
      onClick={handleFormat}
    >
      <Zap size={14} color={'var(--fg-third)'} className='mr-1' /> Format 
    </button>
  )
}

export default FormatBtn