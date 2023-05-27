import React, {  useEffect, useState } from "react";
import Button from "./Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from 'axios';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

interface PostCommentProps {
    feedbackId:string;
}
const PostComment:React.FC<PostCommentProps> = ({
    feedbackId
}) => {
  const [count, setCount] = useState(250);
  const [isLoading, setIsLoading] = useState(false);
  const {data:currentUser} = useCurrentUser();
  const loginModal = useLoginModal();
  const router = useRouter();



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
    
    if(!currentUser){
        loginModal.onOpen()
    }

    axios
      .post(`/api/comments/${feedbackId}`, data)
      .then(() => {
        toast.success("comment added!");
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
    <div className="bg-white rounded-md p-4">
      <p className="font-bold text-lg ">Add Comment</p>
      <textarea
        placeholder="Type your comment here"
        maxLength={250}
        className="w-full bg-ghost_white focus:border-royal_blue rounded-md p-2 text-[13px] font-normal"
        rows={4}
        id="content"
        {...register("content", { required: "Can't be empty" })}
        onChange={(e) => setCount(250-e.target.value.length)}
      />
      <div className="flex flex-row justify-between">
        <p className="my-auto text-[13px] font-normal md:text-xs text-ocean_night">
          {count} Character{count > 1 ? "s" : ""} left
        </p>
        <div className="my-auto">
          <Button label={"Post comment"} padding venetian onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </div>
  );
};

export default PostComment;
