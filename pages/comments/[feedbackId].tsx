import CommentsModal from '@/components/modals/CommentsModal';
import useFeedback from '@/hooks/useFeedback';
import { useRouter } from 'next/router';
import React from 'react'
import { ClipLoader } from "react-spinners";



const CommentsPage = () => {

    const router = useRouter();
    const { feedbackId } = router.query;


    const { data: fetchedFeedback, isLoading } = useFeedback(feedbackId as string);

 
    
    if (isLoading || !fetchedFeedback) {
      return (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="lightblue" size={80} />
        </div>
      )
    }
   
    return (
      <>
    <CommentsModal  feedbackId={fetchedFeedback.id}/>
      </>

      );
    }

export default CommentsPage