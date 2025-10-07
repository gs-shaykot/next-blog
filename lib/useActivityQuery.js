"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useActivityQuery = () => {
  const fetchActivity = async () => {
    const { data } = await axios.get("/api/activities");
    return data;
  };

  const query = useQuery({
    queryKey: ["Activity"],
    queryFn: fetchActivity,
    refetchOnWindowFocus: false,
    refetchInterval: 1000,
  });

  return query;
};
