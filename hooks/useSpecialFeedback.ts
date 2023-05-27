import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useSpecialFeedback = (feature:string) => {
    const {data, error, isLoading, mutate} = useSWR(`api/feedbacks/${feature}`, fetcher );

    return {
        
        data,
        error,
        isLoading,
        mutate
    }
};

export default useSpecialFeedback