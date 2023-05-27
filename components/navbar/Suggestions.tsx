import useSpecialFeed from "@/hooks/useSpecialFeed";

import React from "react";

const Suggestions = () => {
  const items = ["ALL", "UI", "UX", "Enhancement","Bug","Feature"];
  const store = useSpecialFeed()

  const handle = (item:string) => {
    store.setValue1(item)

  }

  return (
    <div className="bg-white flex flex-row flex-wrap p-4 rounded-md  w-[223px] lg:h-[166px] ">

        {items.map((item) => (
            <div key= {item} onClick={() => handle(item)}    className={`px-4 pt-1 m-1 bg-cotton_ball rounded-md text-royal_blue font-semibold h-8 cursor-pointer ${store.value===item? 'bg-royal_blue text-white':''}`} >
                {item}
            </div>

        ))}
    </div>
  );
};

export default Suggestions;
