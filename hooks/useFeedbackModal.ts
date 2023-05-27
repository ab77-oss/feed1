import {create} from 'zustand';

interface FeedbackModalProps {
    isOpen:boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useFeedbackModal = create<FeedbackModalProps>((set) => ({
    isOpen:false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false})
}))

export default useFeedbackModal