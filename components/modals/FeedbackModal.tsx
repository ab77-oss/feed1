import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input";
import useFeedbackModal from "@/hooks/useFeedbackModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const items = [{id:"0", value:"All"}, {id:"1",value:"UI"}, {id:"2",value:"UX"}, {id:"3", value:"Enhancement"}, {id:"4", value:"Bug"}, {id:"5", value:"Feature"}];
const FeedbackModal = () => {

  const feedbackModal = useFeedbackModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful},
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      detail: "",
    },
  });


  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    setIsLoading(true);

    axios
      .post("/api/feedback", data)
      .then(() => {
        toast.success("feedback added!");
        feedbackModal.onClose();
        router.push("/");
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





  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Create New Feedback" />
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
                key={item.id}
                value={item.value}
                className="border-b-2 border-b-venetian_red border-solid py-4"
            >
                    {item.value}
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
        isOpen={feedbackModal.isOpen}
        actionLabel="+ Add feedback"
        onClose={feedbackModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        goBack
        back
      />
    </>
  );
};

export default FeedbackModal;
