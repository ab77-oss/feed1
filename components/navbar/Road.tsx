import useSpecialFeedback from '@/hooks/useSpecialFeedback'
import Link from 'next/link'
import React from 'react'

const Road = () => {

    const {data:countProgress} = useSpecialFeedback('In Progress')
    const {data:countLive} = useSpecialFeedback('Live')
    const {data:countPlanned} = useSpecialFeedback('Planned')

    return (

    <div className="flex flex-col justify-start bg-white p-4 rounded-md  w-[223px] lg:h-[166px]">
        <div className="flex flex-row justify-between pb-4">
            <p className="font-bold text-jewel_cave text-lg">RoadMap</p>
            <p className="font-semibold text-[13px] text-peri_blue my-auto"><Link href={'/roadMap'}>View</Link></p>
        </div>

        <div className="flex flex-row justify-between pb-4">
            <div className="flex flex-row justify-left">
                <li className="list-disc text-creamy_peach"></li>
                <p className="font-normal text-ocean_night text-base text-left">In-Progress</p>
            </div>
            <p>{countProgress?.length ?? 0}</p>
        </div>

        <div className="flex flex-row justify-between pb-4">
            <div className="flex flex-row justify-left">
                <li className="list-disc text-blue_mana"></li>
                <p className="font-normal text-ocean_night text-base text-left">Live</p>
            </div>
            <p>{countLive?.length ?? 0}</p>
        </div>

        <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-left">
                <li className="list-disc text-venetian_red"></li>
                <p className="font-normal text-ocean_night text-base">Planned</p>
            </div>
            <p>{countPlanned?.length ?? 0}</p>
        </div>
    </div>

      )
}

export default Road