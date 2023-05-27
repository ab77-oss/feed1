
import useFeedbacks from '@/hooks/useFeedbacks';

import React from 'react'

const NumberSuggestions = () => {

  const {data:feedback} = useFeedbacks();

  return (
    <div className='hidden md:flex flex-row justify-center font-bold text-white text-lg gap-2'>
        <p>{feedback?.length}</p>
        <p>Suggestion{feedback?.length > 1 ? 's' :''}</p>
    </div>
  )
}

export default NumberSuggestions