import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useComment = (commentId: string) => {
  const { data, error, isLoading, mutate } = useSWR(commentId ? `/api/comment/${commentId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useComment;
