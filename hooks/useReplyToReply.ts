import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useReplyToReply = (replyId: string) => {
  const { data, error, isLoading, mutate } = useSWR(replyId ? `/api/replies/${replyId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useReplyToReply;
