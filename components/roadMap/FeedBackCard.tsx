import FeedItems from "../FeedItems";
import NoFeedbacks from "../NoFeedbacks";
import useSpecialFeedback from "@/hooks/useSpecialFeedback";
import useSpecialFeed from "@/hooks/useSpecialFeed";

interface feedbackProps {
  id: string;
  upVotes?: number;
  title?: string;
  status?:string;
  comments?: string[];
  description?: string;
  detail?: string;
}


const FeedbackCard = () => {
  const store = useSpecialFeed();

  const { data: specialFeedback } = useSpecialFeedback(store.statusValue as string);
  const {data:specialPlanned} = useSpecialFeedback('Planned')
  const {data:specialProgress} = useSpecialFeedback('In Progress')
  const {data:specialLive} = useSpecialFeedback('Live')

  return (!specialFeedback  ? (

    <NoFeedbacks />

  ) : (
   <>
    <div className="md:hidden">
    {specialFeedback?.map((feed: feedbackProps) => (
      
      <FeedItems
      key={feed.id}
      id={feed.id}
      title={feed.title}
      upVotes={feed.upVotes}
      status={feed.status}
      comments={feed.comments}
      description={feed.description}
      detail={feed.detail}
      roadMap
    />
    ))}
    </div>
    <div className="hidden md:flex md: flex-row gap-2">
      <div className="w-1/3">
      {specialPlanned?.map((feed: feedbackProps) => (
      
          <FeedItems
          key={feed.id}
          id={feed.id}
          title={feed.title}
          upVotes={feed.upVotes}
          status={feed.status}
          comments={feed.comments}
          description={feed.description}
          detail={feed.detail}
          roadMap
        />
        ))}

      </div>
      <div className="w-1/3">
      {specialProgress?.map((feed: feedbackProps) => (
      
      <FeedItems
      key={feed.id}
      id={feed.id}
      title={feed.title}
      upVotes={feed.upVotes}
      status={feed.status}
      comments={feed.comments}
      description={feed.description}
      detail={feed.detail}
      roadMap
    />
    ))}

      </div>
      <div className="w-1/3">
      {specialLive?.map((feed: feedbackProps) => (
      
      <FeedItems
      key={feed.id}
      id={feed.id}
      title={feed.title}
      upVotes={feed.upVotes}
      status={feed.status}
      comments={feed.comments}
      description={feed.description}
      detail={feed.detail}
      roadMap
    />
    ))}

      </div>
    </div>
   </>
     

  ))
    
  
};

export default FeedbackCard;



