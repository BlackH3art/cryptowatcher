import { getTokens } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useTokens = () => {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: getTokens,
  });
};
