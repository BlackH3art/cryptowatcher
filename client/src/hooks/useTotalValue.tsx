import { getTokensTotalValue } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export const useTotalValue = () => {
  return useQuery({
    queryKey: ['tokensTotalValue'],
    queryFn: getTokensTotalValue,
  });
};
