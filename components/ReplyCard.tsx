import useReply from "@/hooks/useReply";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from '../public/assets/user-images/placeholder.jpg'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useCurrentUser from "@/hooks/useCurrentUser";

import axios from "axios";
import toast from "react-hot-toast";

import ReplyToReplayCard from "./ReplyToReplayCard";
import {useRouter} from "next/navigation";


interface replyCardProps {
  commentId: string;
}

const ReplyCard: React.FC<replyCardProps> = ({ commentId }) => {
  const { data: reply } = useReply(commentId);
  const [state, setState] = useState({open:false, rplId:''});
    const router = useRouter()

  const {data:currentUser} = useCurrentUser()
  const [isLoading, setIsLoading] = useState(false);



  const {
      register,
      handleSubmit,
      reset,
      formState: {isSubmitSuccessful},

    } = useForm<FieldValues>({
      defaultValues: {
        replyContent: " ",
      },
    });
  
  
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
  
    //   if(!currentUser){
    //     loginModal.onOpen()
    //   }
      
        setIsLoading(true);

      axios
        .post(`/api/replies/${state.rplId}`, data)
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
    <>
      {reply?.length !== 0
        ? reply?.map((rpl: any) => {
            function handleClick(e:any){
                setState(values => ({
                    ...values,
                    open:!state.open,
                    rplId:rpl.id
                }))
            }

            return (
                <>
               <div key={rpl.id} className="flex flex-col justify-start ml-[50px] md:ml-[90px] mb-10 pr-4 ">
                <div  className='flex flex-row justify-between'>
                    <div className='flex flex-row gap-5  my-1'>
                    {rpl.user?.length !== 0 && (
                    <>
                        <Image src={rpl.user?.image || img } alt='user' width={40} height={40} className='rounded-full'/>
                        <div className="ml-[10px]">
                            <div className='font-bold text-[13px] md:text-sm'>{rpl?.user.name}</div>
                            <div className='font-normal text-[13px] md:text-sm'>@{rpl?.user.username}</div>
                        </div>
                    </>
                    )}
                    </div>
                    < div className='text-royal_blue font-semibold mr-4 text-[13px] cursor-pointer' onClick={handleClick}>Reply</div>
                </div>
                <div className="my-1 md:ml-[70px]">
                    <p className="text-venetian_red font-bold float-left mr-2 text-[13px] md:text-[15px]">@{rpl.replyinTo}</p>
                    <div className=" font-normal text-gra text-[13px] text-justify pr-4 md:text-[15px]">{rpl.content}</div>
                </div>
                
            </div>
            
            {state.open && rpl.id===state.rplId && (
                <div className='flex flex-row justify-between gap-4 p-4'>
                    <div className='w-[70%]'>
                    <textarea 
                      className=" bg-ghost_white focus:border-royal_blue w-full h-full   rows={4}  rounded-md p-2 text-[13px] font-normal"
                      rows={4}
                      id="replyContent"
                      {...register("replyContent", { required: "Can't be empty" })}
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
            <ReplyToReplayCard replyId={rpl.id} />
        </>
            );
                
          })
          
        : ""}
    </>
  );
};

export default ReplyCard;

