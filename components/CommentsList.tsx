import React from 'react'
import CommentCard from './CommentCard'
import ReplyCard from './ReplyCard';


interface CommentsListProps {
    comments:[string];
    feedbackId:string;

}

const CommentsList:React.FC<CommentsListProps> = ({
    comments,
    feedbackId,

}) => {


  return (
    <div>
        <div className='bg-white'>
            <p className='text-jewel_cave font-bold text-lg m-4 p-4'>{comments?.length <= 1  ? `${comments?.length} Comment`:`${comments?.length} Comments`}</p>
            
                {comments?.map((comment:any) => (
                  <>
                    <CommentCard key={comment.id}  commentId={comment.id} feedbackId={feedbackId} content1={comment.content}/>
                    <ReplyCard  commentId={comment.id}  />
                    <hr className=' border-t text-gra border-transparent my-4 mx-6'/>
                  </>
                ))}

      </div>
    </div>
  )
}

export default CommentsList