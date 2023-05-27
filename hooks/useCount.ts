import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCount = (feedbackId: string) => {
  const { data, error, isLoading, mutate } = useSWR( `/api/count/${feedbackId}` , fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCount;
