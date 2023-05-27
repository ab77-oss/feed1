
import useFeedback from "@/hooks/useFeedbacks";
import FeedItems from "./FeedItems";
import NoFeedbacks from "./NoFeedbacks";
import useSpecialFeedback from "@/hooks/useSpecialFeedback";
import useSpecialFeed from "@/hooks/useSpecialFeed";



interface feedbackProps {
  id: string;
  upVotes?: number;
  title?: string;
  comments?: string[];
  description?: string;
  detail?: string;
}
let features=['ALL'] as string[]

const FeedbackPage = () => {
  const store = useSpecialFeed();
  const {data:feedback} = useFeedback();
 
  const {data:specialFeedback} = useSpecialFeedback(store.value as string );


  specialFeedback?.map((item:any) => {
    features.push(item.description)
  })


  return (!specialFeedback || !features.includes(store.value as string)) ? (
    <NoFeedbacks />
  ) : (
    
  specialFeedback
  .sort((a:any, b:any) => {
    if (store.dropValue === "Most UpVotes") {
      if ((a.upvotes ?? 0) < (b.upvotes ?? 0)) {
        return 1;
      } else if ((a.upvotes ?? 0) > (b.upvotes ?? 0)) {
        return -1;
      }
    }
    if (store.dropValue === "Least UpVotes") {
      if ((a.upvotes ?? 0) > (b.upvotes ?? 0)) {

        return 1;
      } else if ((a.upvotes ?? 0) < (b.upvotes ?? 0)) {
        return -1;
      }
    }
    if (store.dropValue === "Most Comments") {
      if ((a.comments?.length ?? 0) < (b.comments?.length ?? 0)) {
        return 1;
      } else if ((a.comments?.length ?? 0) > (b.comments?.length ?? 0)) {
        return -1;
      }
    }
    if (store.dropValue === "Least Comment") {
      if ((a.comments?.length ?? 0) < (b.comments?.length ?? 0)) {
        return -1;
      } else if ((a.comments?.length ?? 0) > (b.comments?.length ?? 0)) {
        return 1;
      }
    }
    return 0; // Return 0 for equal values or when none of the conditions match
  })
  .map((feed: feedbackProps) => (
    <FeedItems
      key={feed.id}
      id={feed.id}
      title={feed.title}
      upVotes={feed.upVotes}
      comments={feed.comments}
      description={feed.description}
      detail={feed.detail}
    />
  ))
    
  );
};

export default FeedbackPage;
