import {RiArrowDropUpLine} from 'react-icons/ri'
import useSpecialFeed from '@/hooks/useSpecialFeed'

const SortedMenu = () => {
  const store = useSpecialFeed()
  const handleOpen= () =>  {
    if(store.displayed){
      store.setValue6()
    }else{
      store.setValue5()
    }
  }

  return (
    <div className='flex flex-row justify-center gap-2'>
        <div className='flex items-center'>
          <p className="font-normal text-[13px] md:text-[14px] text-cotton_ball cursor-pointer" onClick={handleOpen}>Sort by:</p>
        </div>
        <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
          <span className="mr-1 text-white text-[13px] md:text-[14px]">{store.dropValue}</span>
          <RiArrowDropUpLine size={30} className='text-white' />
        </button>
         
     
       
    </div>
  )
}

export default SortedMenu