import {create} from 'zustand';

interface CommentsModalStore {
    isOpen:boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCommentsModal = create<CommentsModalStore>((set) => ({
    isOpen:false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false})
}))

export default useCommentsModal