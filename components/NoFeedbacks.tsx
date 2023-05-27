import React, { useCallback } from 'react'
import Image from 'next/image'
import noFeed from '../public/assets/suggestions/illustration-empty.svg'
import useLoginModal from '@/hooks/useLoginModal';
import useFeedbackModal from '@/hooks/useFeedbackModal';
import useCurrentUser from '@/hooks/useCurrentUser';


const NoFeedbacks = () => {
    const loginModal = useLoginModal();
    const feedbackModal = useFeedbackModal()
    const {data:currentUser} = useCurrentUser();
   
const handleClick= useCallback(() => {

  if(!currentUser){
    loginModal.onOpen()
  }else{
    feedbackModal.onOpen()
  }
 
    
},[currentUser, feedbackModal, loginModal])

  return (
    <div className='flex flex-col justify-center h-screen w-fit items-center mx-auto'>
       <Image src={noFeed} alt="noFeedback" />
       <p className='text-jewel_cave text-2xl font-bold'>There is no feed back yet.</p>
       <p className='text-ocean_night font-normal text-[16px]'>Got a suggestion? Found a bug that needs to be squashed</p>
       <p className='text-ocean_night font-normal text-[16px]'>We love hearing about new ideas to improve our app.</p>
       <div 
        onClick={handleClick}
        className="
        bg-venetian_red 
        text-white 
        font-bold 
        text-xs 
        rounded-[10px] 
        p-3 
        cursor-pointer 
        hover:opacity-70
        w-fit
    ">
      + Add Feedback
    </div>
    </div>
  )
}

export default NoFeedbacks