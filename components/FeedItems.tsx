import useComments from "@/hooks/useComments";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import useSpecialFeed from "@/hooks/useSpecialFeed";
import useUpvote from "@/hooks/useUpvotes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FaRegComment } from "react-icons/fa";
import { RiArrowDropUpLine } from "react-icons/ri";

interface feedItemsProps {
  id?: string;
  upVotes?: number;
  title?: string;
  status?: string;
  comments?: string[];
  description?: string;
  detail?: string;
  roadMap?: boolean;
}

const FeedItems: React.FC<feedItemsProps> = ({
  id,
  title,
  comments,
  status,
  description,
  detail,
  roadMap,
}) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();
  const { data: upVotes } = useUpvote(id as string);
  const [isLoading, setIsLoading] = useState(false);
  const { data: Comments } = useComments(id as string);



  
  const store = useSpecialFeed()

  const handleClick = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }
    router.push(`/comments/${id}`);
  }, [currentUser, id, loginModal, router]);

  const handleVote = () => {
    if (!currentUser) {
      loginModal.onOpen();
    }

    axios
      .patch(`api/feedback/upvotes/${id}`)
      .then(() => {
        toast.success("Success UpVote!");
        router.refresh();
      })
      .catch((error) => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {roadMap ? (
        <div
          className={`
          bg-white 
          flex 
          flex-col
          justify-between 
          p-2
          gap-2
          rounded-[10px] 
          my-2 
          text-justify
          border-t-4 
          md:h-[251px]
          lg:h-[272px]
          
          ${status==="In Progress"?'border-venetian_red':''}
          ${status==="Live"?'border-blue_mana':''}
          ${status==='Planned'?'border-creamy_peach':''}
          `}
        >
          
          <div className={`flex flex-col w-full `} >
            <div className="flex flex-col justify-start">
              <div className="flex flex-row justify-start mb-2">
                <li className={`
                    list-disc 
                    my-auto
                    ${status==="In Progress"?'text-venetian_red':''}
                    ${status==="Live"?'text-blue_mana':''}
                    ${status==='Planned'?'text-creamy_peach':''}
                    `}>
                </li>
                <p className="font-bold text-jewel_cave my-auto text-xs md:text-[13px] md:py-2 lg:py-1 lg:text-[16px] ">
                  {status}
                </p>
              </div>
              <p className="font-bold text-jewel_cave text-xs md:text-[13px] py-1 lg:text-lg mb-2">
                {title}
              </p>
              <p className="font-normal text-ocean_night text-xs md:text-[13px] lg:text-[16px] pb-2">
                {detail}
              </p>
              <p className="text-royal_blue font-semibold bg-cotton_ball text-xs  text-center w-fit p-2 rounded-md">
                {description}
              </p>
            </div>
            <div className="flex flex-row justify-between gap-2">
              <div className="flex flex-row justify-center bg-cotton_ball h-[32px] w-[69px]  my-4 rounded-lg  md:hidden ">
                <RiArrowDropUpLine
                  size={30}
                  className="text-royal_blue cursor-pointer  text-center text-xs md:text-lg "
                  onClick={handleVote}
                />
                <div className="text-center text-xs font-bold my-auto md:text-lg">
                  {!upVotes ? 0 : upVotes}
                </div>
              </div>
              {/* Not visible for md screen -begin- */}
              <div className="flex flex-row justify-center gap-2 m-2 my-4  rounded-md p-1 items-center md:hidden">
                <Link href={`/comments/${id}`}>
                  <FaRegComment
                    size={18}
                    className="cursor-pointer bg-cotton_ball rounded-full"
                  />
                </Link>
                <div className="cursor-pointer text-xs md:text-lg">
                  {!comments ? "0" : Comments?.length}
                </div>
              </div>
              {/* Not visible for md screen -End- */}
            </div>
          </div>
          {/* Not visible for mobile screen -begin-  */}
          <div className="hidden md:flex md:flex-row justify-between gap-2  my-4 rounded-md  items-center">
                <div className="hidden md:flex md:flex-row justify-center h-[32px] w-[69px] bg-cotton_ball   md:mr-10 rounded-md hover:bg-Lavender_Blue focus:bg-royal_blue">
                    <RiArrowDropUpLine
                        size={30}
                        className="text-royal_blue cursor-pointer  text-center text-xs md:text-lg"
                        onClick={handleVote}
                    />
                    <div className="text-center text-[13px] font-bold my-auto">{!upVotes ? 0 : upVotes}</div>
                </div>
                
                <div className="flex flex-row gap-2">
                <FaRegComment
                    size={20}
                    className="cursor-pointer bg-cotton_ball rounded-full"
                />
                 <div className="cursor-pointer text-[13px] font-bold my-auto" onClick={handleClick}>
                    {" "}
                    {!comments ? "0" : comments.length}
                </div>
                </div>
          </div>
          {/* Not visible for mobile screen -End-  */}
        </div>
      ) : (
        <div className={`bg-white z-10 flex  flex-row justify-between p-4 rounded-[10px] text-justify my-2 ${store.isChanged ? ' bg-gra' : ''}`}>
          
          <div className="hidden md:flex md:flex-col justify-center bg-cotton_ball h-[53px] w-[40px] m-2 md:mr-10 rounded-md p-1 hover:bg-Lavender_Blue focus:bg-royal_blue">
            <RiArrowDropUpLine
              size={30}
              className="text-royal_blue cursor-pointer"
              onClick={handleVote}
            />
            <div className="text-center">{!upVotes ? 0 : upVotes}</div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col justify-start">
              <p className="font-bold text-jewel_cave text-xs md:text-lg mb-2">
                {title}
              </p>
              <p className="font-normal text-ocean_night text-xs md:text-lg pb-2">
                {detail}
              </p>
              <p className="text-royal_blue font-semibold bg-cotton_ball text-xs  text-center w-fit p-2 rounded-md">
                {description}
              </p>
            </div>
            <div className="flex flex-row justify-between gap-2">
              <div className="flex flex-row justify-center bg-cotton_ball h-[32px] w-[69px]  my-4 rounded-lg  md:hidden">
                <RiArrowDropUpLine
                  size={30}
                  className="text-royal_blue cursor-pointer  text-center text-xs md:text-lg "
                  onClick={handleVote}
                />
                <div className="text-center text-xs font-bold my-auto md:text-lg">
                  {!upVotes ? 0 : upVotes}
                </div>
              </div>
              {/* Not visible for md screen -begin- */}
              <div className="flex flex-row justify-center gap-2 m-2 my-4  rounded-md p-1 items-center md:hidden">
                <Link href={`/comments/${id}`}>
                  <FaRegComment
                    size={18}
                    className="cursor-pointer bg-cotton_ball rounded-full"
                  />
                </Link>
                <div className="cursor-pointer text-xs md:text-lg">
                  {!comments ? "0" : Comments?.length}
                </div>
              </div>
              {/* Not visible for md screen -End- */}
            </div>
          </div>
          {/* Not visible for mobile screen -begin-  */}
          <div className="hidden md:flex md:flex-row justify-center gap-2 m-2 my-4 rounded-md p-1 items-center">
            <div>
              <FaRegComment
                size={20}
                className="cursor-pointer bg-cotton_ball rounded-full"
              />
            </div>

            <div className="cursor-pointer" onClick={handleClick}>
              {" "}
              {!comments ? "0" : comments.length}
            </div>
          </div>
          {/* Not visible for mobile screen -End-  */}
        </div>
      )}
    </>
  );
};

export default FeedItems;
