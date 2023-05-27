import React from "react";
import useSpecialFeed from "@/hooks/useSpecialFeed";
import useSpecialFeedback from "@/hooks/useSpecialFeedback";

const BarTool = () => {
  const store = useSpecialFeed();



  const handle = (item: string) => {
    
    store.setValue2(item);
   
  };

  const { data: countProgress } = useSpecialFeedback("In Progress");
  const { data: countLive } = useSpecialFeedback("Live");
  const { data: countPlanned } = useSpecialFeedback("Planned");

  return (
    <div className="md:hidden">
      <div className="flex flex-row justify-center ">
        <div className={`
          flex 
          flex-row 
          justify-center 
          text-jewel_cave 
          border-b-1
          text-[13px]
          gap-1
          p-4 
          w-[100%]
          ${store.statusValue==='Planned'?'border-creamy_peach':''}
          ${store.statusValue==='Planned'?'border-b-4':''}
          ${store.statusValue==='Planned'?'font-bold':''}
          
          `}
          >
          <div className="cursor-pointer" onClick={() => handle("Planned")}>
            Planned
          </div>
          <div className="">({countPlanned?.length ?? 0})</div>

        </div>
        <div className={`
          flex 
          flex-row 
          justify-center  
          text-jewel_cave 
          border-b-1 
          gap-2
          text-[13px]
          p-4
          w-[100%]
          ${store.statusValue==='In Progress'?'border-venetian_red':''}
          ${store.statusValue==='In Progress'?'border-b-4':''}
          ${store.statusValue==='In Progress'?'font-bold':''}
          `}
          >
          <div className="cursor-pointer " onClick={() => handle("In Progress")}>
            In Progress
          </div>
          <div>({countProgress?.length ?? 0})</div>
        </div>
        <div className={`
          flex 
          flex-row 
          justify-center 
          text-jewel_cave 
          border-b-1
          text-[13px]
          gap-1
          p-4 
          w-[100%]
          ${store.statusValue==='Live'?'border-blue_mana':''}
          ${store.statusValue==='Live'?'border-b-4':''}
          ${store.statusValue==='Live'?'font-bold':''}
          `}
          >
          <div className="cursor-pointer" onClick={() => handle("Live")}>
            Live
          </div>
          <div>({countLive?.length ?? 0})</div>
        </div>
      </div>
      <hr className="border-gra"/>
    </div>
  );
};

export default BarTool;
