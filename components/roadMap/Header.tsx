import React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import icon from '../../public/assets/shared/icon-arrow-left.svg'
import AddFeedback from '@/components/feedBackBar/AddFeedback'



const Header = () => {


    const router = useRouter()
  return (
    
        <div className='flex flex-row gap-1 justify-between items-center p-4 bg-american_blue md:rounded-md w-[100%]  mt-2 lg:mt-0'>
            <div className='flex flex-col justify-start'>
                <div className=" flex flex-row gap-4 cursor-pointer" onClick={() => {router.push('/')}}>
                    <Image src={icon} alt='arrow-left' className=''/>
                    <p className=" text-white text-xs">Go back</p>
                </div>
                <div className='font-bold text-lg text-white'>RoadMap</div>
            </div>
            <AddFeedback /> 

        </div>
    
)}

export default Header