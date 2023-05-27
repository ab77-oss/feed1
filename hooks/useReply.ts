import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useReply = (commentId: string) => {
  const { data, error, isLoading, mutate } = useSWR(commentId ? `/api/reply/${commentId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useReply;
