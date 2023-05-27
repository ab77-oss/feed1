
import React from 'react'
import {useRouter} from 'next/router'
import Header from '@/components/roadMap/Header';
import BarTool from '@/components/roadMap/BarTool';
import Title from '@/components/roadMap/Title';
import FeedBackCard from '@/components/roadMap/FeedBackCard';


const RoadPage = () => {

  
  return (
    
       <>
        <Header  />
        <BarTool />
        <Title />
        <div className='p-4 md:py-2 md:px-0'>
          <FeedBackCard />
        </div>
        
       </>
    
)}

export default RoadPage