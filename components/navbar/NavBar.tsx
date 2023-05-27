import React from 'react'
import Mentor from './Mentor'
import Suggestions from './Suggestions'
import Road from './Road'
import Bar from './Bar'


const NavBar = () => {
  return (
    <>
    <Bar />
    <div className='hidden md:flex md:flex-row md:gap-1 lg:flex  lg:flex-col  lg:max-w-[255px] md:mb-5'>
       <Mentor />
       <Suggestions />
       <Road />
    </div>
    </>
  )
}

export default NavBar