import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input";
import { useRouter } from "next/navigation";
import Router from 'next/router'
import { useEffect, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFeedback from "@/hooks/useFeedback";
import useEditFeedModal from "@/hooks/useEditFeedModal";
import useLoginModal from "@/hooks/useLoginModal";

interface feedbackProps {
  feedbackId : string
}


const items = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];
const status = ["Suggestion", "Planned", "In Progress", "Live"];

const EditFeedbackModal:React.FC<feedbackProps> = ({
  feedbackId 
}) => {

  const {data:feedback} = useFeedback(feedbackId as string)

 const {data:currentUser} =useCurrentUser()
 const EditFeedbackModal = useEditFeedModal()
 

 console.log('currentUser',currentUser)

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful},
  } = useForm<FieldValues>({
    defaultValues: {
      title: feedback?.title,
      description: feedback?.description,
      detail: feedback?.detail,
      status:""
    },
  });


  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    console.log('UserId',feedback.userId)
    console.log('CurrentUser',currentUser?.id)

    
    setIsLoading(true);
    axios
      .patch(`/api/feedback/${feedbackId}`, data)
      .then(() => {
        toast.success("feedback updated!");
        EditFeedbackModal.onClose();
        router.push("/");

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


  const handleDelete= () => {
    setIsLoading(true);
    axios.
      delete(`/api/feedback/${feedbackId}`)
      .then(() => {
        toast.success("feedback deleted!");
        EditFeedbackModal.onClose();
        router.push("/");
      })
      .catch((error) => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
    
  };


  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={`Editing:${feedback.title}`} />
      <div className="flex flex-col justify-start">
        <p className="text-jewel_cave font-bold text-xs">Feedback Title</p>
        <p className="text-jewel_cave font-extralight text-xs">
          Add a short, descriptive headline
        </p>
      </div>
      <Input
        id="title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
   
      <div className="flex flex-col justify-start">
        <p className="text-jewel_cave font-bold text-xs">Category</p>
        <p className="text-jewel_cave font-extralight text-xs">
          Choose a category for your feedback
        </p>
      </div>
      <div>
        <select
          disabled={isLoading}
          id="description"
          {...register("description", { required: "Can't be empty" })}
          className=" w-full p-2 mb-6 text-sm text-jewel_cave border-2 border-royal_blue  rounded-md bg-ghost_white py-6"
        >
          {items.map((item) => (
            <>
           
            <option
                key={item}
                value={item}
                className="border-b-2 border-b-venetian_red border-solid py-4"
            >
                    {item}
            </option>
            
            </>
          ))}
        </select>
      </div>
      
      <div className="flex flex-col justify-start">
        <p className="text-jewel_cave font-bold text-xs">Updated Status</p>
        <p className="text-jewel_cave font-extralight text-xs">
          Change feature state
        </p>
      </div>
      <div>
      <select
          disabled={isLoading}
          id="status"
          {...register("status", { required: "Can't be empty" })}
          className=" w-full p-2 mb-6 text-sm text-jewel_cave border-2 border-royal_blue  rounded-md bg-ghost_white py-6"
        >
          {status.map((item) => (
            <>
           
            <option
                key={item}
                value={item}
                className="border-b-2 border-b-venetian_red border-solid py-4"
            >
                    {item}
            </option>
            
            </>
          ))}
        </select>
        </div>


      <div className="flex flex-col justify-start">
        <p className="text-jewel_cave font-bold text-xs">Feedback Detail</p>
        <p className="text-jewel_cave font-extralight text-xs">
          Include any specific comments on what should be improved, added, etc.
        </p>
      </div>
      <textarea
        id="detail"
        required
        disabled={isLoading}
        {...register("detail", {
          required: "Can't be empty",
          maxLength: {
            value: 250,
            message: "maximum 250 words",
          },
        })}
        rows={5}
        cols={70}
        className="  
            peer
            w-full
            p-4
            pt-6
            font-light
            bg-ghost_white
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            focus:border-2
            focus:border-royal_blue
            "
      />
    </div>
  );



  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={EditFeedbackModal.isOpen}
        actionLabel="Save Changes"
        onClose={EditFeedbackModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        onDelete={handleDelete}
        goBack
        reduce
        back
        
      />
    </>
  );
};

export default EditFeedbackModal;
