"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAnalyticsData = () => {
  const fetchAnalytics = async () => {
    const { data } = await axios.get("http://localhost:3000/api/analytics");
    return data;
  };

  const query = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
    refetchOnWindowFocus: false,
  });

  return query;
}; 

export const refetchAnalytics = async (queryClient) => {
  await queryClient.invalidateQueries(["analytics"]);
};
