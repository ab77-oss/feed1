import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useUpvote = (feedbackId: string) => {
  const { data, error, isLoading, mutate } = useSWR(feedbackId ? `/api/feedback/upvotes/${feedbackId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useUpvote;
