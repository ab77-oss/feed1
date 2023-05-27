import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useComments = (feedbackId: string) => {
  const { data, error, isLoading, mutate } = useSWR(feedbackId ? `/api/comments/${feedbackId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useComments;
