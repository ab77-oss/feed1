import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import React, { useCallback } from "react";
import useFeedbackModal from "@/hooks/useFeedbackModal";


const AddFeedback:React.FC =  () => {

    const loginModal = useLoginModal();
    const feedbackModal = useFeedbackModal()
    const {data:currentUser} = useCurrentUser();
   
const handleClick= useCallback(() => {

  if(!currentUser){
    loginModal.onOpen()
  }else{
    feedbackModal.onOpen()
  }
 
    
},[currentUser, feedbackModal, loginModal])

  return (
    <div 
        onClick={handleClick}
        className="
        bg-venetian_red 
        text-white 
        font-bold 
        text-xs 
        rounded-[10px] 
        p-3 
        cursor-pointer 
        hover:opacity-70
        hover:bg-Heliotrope
    ">
      + Add Feedback
    </div>
  );
};

export default AddFeedback;
