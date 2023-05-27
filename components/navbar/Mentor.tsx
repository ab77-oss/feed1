import useCurrentUser from '@/hooks/useCurrentUser'
import React from 'react'
import Image from 'next/image';


import img from '../../public/assets/user-images/placeholder.jpg'
import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';

import Suggestions from './Suggestions';
import Road from './Road';

import useSpecialFeed from '@/hooks/useSpecialFeed';



const Mentor:React.FC = () => {

  const loginModal = useLoginModal();
  const {data:currentUser} = useCurrentUser();
  const username = currentUser?.username
  const router= useRouter()


  const store = useSpecialFeed()
  
  const handleClick = () => {
   if(store.isChanged){
    store.setValue4()
   }else{
    store.setValue3()
   }
   
  };

  return (
    <>
    <div className='hidden z-10 w-[223px] bg-white bg-mobileBg md:bg-tabletBg lg:bg-desktopBg md:flex flex-col p-4 rounded-md text-white  lg:h-[166px] m-0'>
      <p className='text-center'>{username}</p>
      <div className='flex flex-row justify-between'>
      <Image src={currentUser?.image || img } alt='user' width={40} height={40} className='rounded-full cursor-pointer' onClick={() =>{ !currentUser && (loginModal.onOpen())}}/>
      {currentUser && (<button onClick={() => signOut()}><BiLogOut size={30} /></button>)}
      </div>
      <div className="flex flex-col">
        <p className='font-bold '>Frontend Mentor</p>
        <p className='font-medium '>Feedback Board</p>
      </div>
    </div>
    <div className='flex flex-col'>
      <div className='bg-mobileBg  flex flex-row justify-between p-2  text-white w-[100%] md:hidden '>
        <div className="flex flex-col">
          <p className='font-bold '>Frontend Mentor</p>
          <p className='font-medium '>Feedback Board</p>
        </div>
        <>
    <div className=' flex flex-col justify md:hidden'>
        <div className={`flex flex-col wrap bar cursor-pointer my-auto text-right ${store.isChanged ? 'change' : ''}`} onClick={handleClick}>
          <div className='bar top h-[5px] w-[40px] bg-ghost_white transition-all my-1'></div>
          <div className='bar middle h-[5px] w-[40px] bg-ghost_white translate-all my-1'></div>
          <div className='bar bottom h-[5px] w-[40px] bg-ghost_white transition-all my-1'></div>
        </div>
        </div>
      </>
    </div>
    {store.isChanged ? (
          <div className=' z-40 inset-y-0  flex flex-col gap-2 w-[60%] h-screen absolute top-[80px] right-0 bg-ghost_white p-2 rounded-2 transition-opacity md:hidden'>
           <p className='text-center'>{username}</p>
        <div className='flex flex-row justify-between'>
        <Image src={currentUser?.image || img } alt='user' width={40} height={40} className='rounded-full cursor-pointer' onClick={() =>{ !currentUser && (loginModal.onOpen())}}/>
        {currentUser && (<button onClick={() => signOut()}><BiLogOut size={30} /></button>)}
        </div>
            <Suggestions />
            <Road />
          </div>        
      ):(
        <>
        </>
      )}
    </div>
    </>
  )
}

export default Mentor




