import React, { useCallback } from 'react';
import FeedItems from '../FeedItems';
import useFeedback from '@/hooks/useFeedback';
import useComments from '@/hooks/useComments';
import {useRouter} from 'next/navigation';
import useEditFeedModal from '@/hooks/useEditFeedModal';
import PostComment from '../PostComment';
import HeaderPostComment from '../HeaderPostComment';
import CommentsList from '../CommentsList';;



interface CommentProps {
    feedbackId:string;
    
    
}

const CommentsModal:React.FC<CommentProps> = ({
    feedbackId,
    
    
}) => {
  const router = useRouter()
  const {data:feedback} = useFeedback(feedbackId as string)
  const {data:comments} = useComments(feedbackId as string)
  const EditFeedModal = useEditFeedModal()




  const handleClose = useCallback(() => {
      router.push('/')
  },[router])

  const handleEditFeed = useCallback(() => {
    EditFeedModal.onOpen()
  },[EditFeedModal])

  return (
    <div>
      <HeaderPostComment href={`/feedbackclient/${feedback.id}`} label={'Edit FeedBack'} onClick1={handleClose} onClick2={handleEditFeed} />
      <FeedItems
          key={feedback.id}
          id={feedback.id}
          title={feedback.title}
          upVotes={feedback.upVotes}
          comments={comments}
          description={feedback.description}
          detail={feedback.detail}
        />
      <CommentsList comments={comments} feedbackId={feedback.id}/>
      <PostComment feedbackId={feedbackId} />
     </div>
  )
}

export default CommentsModal