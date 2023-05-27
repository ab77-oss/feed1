import React from 'react'
import Logo from './Logo'
import NumberSuggestions from './NumberSuggestions'
import SortedMenu from './SortedMenu'
import AddFeedback from './AddFeedback'
import FeedbackPage from '../FeedbackPage'
import useSpecialFeed from '@/hooks/useSpecialFeed'
import {BsCheck} from 'react-icons/bs'

const FeedbackBar = () => {
  const store = useSpecialFeed()

  return (
    <div className={`flex flex-col lg:w-3/4 z-0 ${store.isChanged ? 'relative pointer-events-none opacity-30 bg-gra md:pointer-events-auto' : ''} `}>
    <div className='flex flex-row gap-1 justify-evenly items-center  bg-american_blue md:rounded-md md:mt-1 h-[56px] lg:h-[72px]  lg:mt-0'>
        <Logo />
        <NumberSuggestions />
        <SortedMenu />
        <AddFeedback /> 
        {store.displayed && (<div className='bg-white drop-shadow-md flex flex-col w-[255px] text-ocean_night text-left text-[16px] font-normal  z-40 rounded-md absolute top-[140px] md:top-[300px] lg:top-[120px] mx-auto'>
              <div className='flex flex-row justify-between'>
                <div className=" py-2 pl-2 hover:text-venetian_red cursor-pointer" onClick={() => store.setValue7('Most UpVotes')}>Most UpVotes</div>
                {store.dropValue==='Most UpVotes' && (<BsCheck size={30} className='my-auto' />)}
              </div>
              <hr/>
              <div className='flex flex-row justify-between'>
                <div className=" py-2 pl-2 hover:text-venetian_red cursor-pointer" onClick={() => store.setValue7('Least UpVotes')}>Least UpVotes</div>
                {store.dropValue==='Least UpVotes' && (<BsCheck size={30} className='my-auto' />)}
              </div>
              <hr/>
              <div className='flex flex-row justify-between'>
                <div className=" py-2 pl-2 hover:text-venetian_red cursor-pointer" onClick={() => store.setValue7('Most Comments')}>Most Comments</div>
                {store.dropValue==='Most Comments' && (<BsCheck size={30} className='my-auto' />)}
              </div>
              <hr/>
              <div className='flex flex-row justify-between'>
                <div className="py-2 pl-2 hover:text-venetian_red cursor-pointer" onClick={() => store.setValue7('Least Comment')}>Least Comment</div>
                {store.dropValue==='Least Comment' && (<BsCheck size={30} className='my-auto' />)}
              </div>
         </div>)}

    </div>
      <FeedbackPage />
    </div>


  )
}

export default FeedbackBar