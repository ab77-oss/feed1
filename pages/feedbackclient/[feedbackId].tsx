import EditFeedbackModal from '@/components/modals/EditFeedbackModal';
import useFeedback from '@/hooks/useFeedback';
import { useRouter } from 'next/router';
import React from 'react'
import { ClipLoader } from "react-spinners";


const Edit = () => {

    const router = useRouter();
    const { feedbackId } = router.query;

    const { data: fetchedFeedback, isLoading } = useFeedback(feedbackId as string);
    console.log('data',fetchedFeedback)
    if (isLoading || !fetchedFeedback) {
      return (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="lightblue" size={80} />
        </div>
      )
    }
    return (
      <>
        <EditFeedbackModal  feedbackId={fetchedFeedback.id} />
      </>

      );
    }

export default Edit