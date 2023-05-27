import {create} from 'zustand';


interface specialFeedStore {
    value:string | undefined;
    statusValue: string | undefined;
    isChanged:boolean
    displayed:boolean
    dropValue:string | undefined;
    numberFeedback:string | undefined

    setValue1:(newValue:string) => void;
    setValue2:(newValue:string) => void;
    setValue3:() => void;
    setValue4:() => void;
    setValue5:() => void;
    setValue6:() => void;
    setValue7:(newValue:string) => void;
    setValue8:(newValue:string) => void;

}

const useSpecialFeed = create<specialFeedStore>((set) => ({

   

    value:'ALL',
    statusValue:'Planned',
    isChanged:false,
    displayed:false,
    dropValue:'Most UpVotes',
    numberFeedback:'',

    setValue1: (newValue) => set(() => ({value:newValue})),
    setValue2: (newValue) => set(() => ({statusValue:newValue})),
    setValue3: () => set({isChanged:true}),
    setValue4: () => set({isChanged:false}),
    setValue5: () => set({displayed:true}),
    setValue6: () => set({displayed:false}),
    setValue7: (newValue) => set(() => ({dropValue:newValue})),
    setValue8: (newValue) => set(() => ({numberFeedback:newValue})),
}))

export default useSpecialFeed