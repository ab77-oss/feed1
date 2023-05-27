import React from 'react';

import Image from 'next/image';
import icon from '../public/assets/shared/icon-arrow-left.svg'
import Button from './Button';
import Link from 'next/link';

interface HeaderProps {
    href:string;
    onClick1:() => void;
    onClick2:() => void;
    label:string
}

const HeaderPostComment:React.FC<HeaderProps> = ({
    href,
    onClick1,
    onClick2,
    label
}) => {
  return (
    <div>
        <div className='flex flex-row justify-between'>
        <div className=" flex flex-row gap-2 cursor-pointer py-10 px-4" onClick={onClick1}>
              <Image src={icon} alt='arrow-left' />
              <p className=" bg-white text-ocean_night text-xs">Go back</p>
        </div>
        
        <div className='my-auto' >
          <Link href={href} ><Button label={label} royal  padding onClick={onClick2}
            /></Link>
        </div>
      </div>
    </div>
  )
}

export default HeaderPostComment