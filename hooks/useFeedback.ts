import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useFeedback = (feedbackId: string) => {
  const { data, error, isLoading, mutate } = useSWR(feedbackId ? `/api/feedback/${feedbackId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useFeedback;
