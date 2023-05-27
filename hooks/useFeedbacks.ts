import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useFeedback = () => {
    const {data, error, isLoading, mutate} = useSWR('api/feedback', fetcher );

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useFeedback