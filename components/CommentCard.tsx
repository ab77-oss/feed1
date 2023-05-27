import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import img from '../public/assets/user-images/placeholder.jpg'
import { useRouter } from 'next/navigation'
import useComment from '@/hooks/useComment'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import axios from 'axios'

interface commentProps {
    feedbackId:string;
    content1:string;
    commentId:string
}

const CommentCard:React.FC<commentProps> = ({ 
    content1,
    commentId
}) => {

    const {data:comment} = useComment(commentId)
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const router=useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: {isSubmitSuccessful},
      } = useForm<FieldValues>({
        defaultValues: {
        content: " ",
          
        },
      });
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
        setIsLoading(true);
        
        axios
          .post(`/api/reply/${commentId}`, data)
          .then(() => {
            toast.success("reply added!");
            router.refresh()
           
          })
          .catch((error) => {
            toast.error("something went wrong");
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      
      useEffect(() => {
        if (isSubmitSuccessful){
            reset()
        }
      },[isSubmitSuccessful, reset])

  return (
    <div className='px-4 mb-4 mx-4'>
        <div>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row gap-8 mb-5'>
                    <Image src={comment?.user.image || img } alt='user' width={40} height={40} className='rounded-full'/>
                    <div>
                        <div className='font-bold text-[13px] md:text-sm'>{comment?.user.name}</div>
                        <div className='font-normal text-[13px] md:text-sm'>@{comment?.user.username}</div>
                    </div>
                </div>
                <div className='text-royal_blue font-semibold text-[13px] cursor-pointer' onClick={() => setOpen(!open)}>Reply</div>
            </div>
        </div>
        <div className='font-normal text-gra text-justify text-[13px] md:ml-[70px]'>{content1}</div>

        {open && (
                <div className='flex flex-row justify-between gap-4 p-4'>
                    <div className='w-[70%]'>
                    <textarea 
                    className=" bg-ghost_white focus:border-royal_blue w-full h-full   rows={4}  rounded-md p-2 text-[13px] font-normal"
                    rows={4}
                    id="content"
                    {...register("content", { required: "Can't be empty" })}
                    />
                    </div>
                    <div className='w-[30%]'>
                    <div 
                        onClick={handleSubmit(onSubmit)}
                        className="
                        bg-venetian_red 
                        text-white 
                        font-bold 
                        text-xs 
                        text-center
                        md:text-sm
                        rounded-[10px] 
                        p-3 
                        cursor-pointer 
                        hover:opacity-70
                    ">
                    Post Reply
                    </div>
                    
                  </div>
                </div>
        )}
    </div>
  )
}

export default CommentCard