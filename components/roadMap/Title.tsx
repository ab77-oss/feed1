import useSpecialFeed from '@/hooks/useSpecialFeed';
import useSpecialFeedback from '@/hooks/useSpecialFeedback'
import React from 'react'


const Title = () => {

  const store = useSpecialFeed();
  
  const {data:countProgress} = useSpecialFeedback('In Progress')
  const {data:countLive} = useSpecialFeedback('Live')
  const {data:countPlanned} = useSpecialFeedback('Planned')

  const {data:count} = useSpecialFeedback(store.statusValue as string)

  return (
    <>
      {/* Hidden if tablet, desktop devices */}
      <div className='flex flex-col p-6 md:hidden'>
          <div className=' flex flex-row gap-2 font-bold text-lg'>
              <div>{store.statusValue}</div>
              <div>({count?.length ?? 0})</div>
          </div>
          <p className='text-[13px] font-normal'>
            Features currently being developed
            
            
          </p>
      </div>
      {/* Hidden if mobile device */}
      <div className='hidden md:flex md:flex-row md:justify-center'>
        <div className='
          flex 
          flex-col  
          justify-center 
          text-jewel_cave 
          border-b-1
          text-[13px]
          gap-1
          p-4 
          w-[100%]'>
          <div className=' flex flex-row gap-2 font-bold text-[14px]'>
                <div>Planned</div>
                <div>({countPlanned?.length ?? 0})</div>
            </div>
            <p className='text-[13px] font-normal'>Ideas prioritized for research</p>
        </div>

        <div className='
          flex 
          flex-col  
          justify-center 
          text-jewel_cave 
          border-b-1
          text-[13px]
          gap-1
          p-4 
          w-[100%]'>
          <div className=' flex flex-row gap-2 font-bold text-[14px]'>
                <div>In-Progress</div>
                <div>({countProgress?.length ?? 0})</div>
            </div>
            <p className='text-[13px] font-normal'>Currently being developed</p>
        </div>

        <div className='
          flex 
          flex-col  
          justify-center 
          text-jewel_cave 
          border-b-1
          text-[13px]
          gap-1
          p-4 
          w-[100%]'>
          <div className=' flex flex-row gap-2 font-bold text-[14px]'>
                <div>Live</div>
                <div>({countLive?.length ?? 0})</div>
            </div>
            <p className='text-[13px] font-normal'>Released features</p>
        </div>


      </div>
    </>
    
  )
}

export default Title