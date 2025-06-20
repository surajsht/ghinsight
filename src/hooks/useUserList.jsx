import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async ({ pageParam, queryKey }) => {
  const [_key, { user, type }] = queryKey;

  const resp = await axios.get(
    `https://api.github.com/users/${user}/${type}?page=${pageParam}&per_page=10`,
    {
      headers: {
        Authorization: import.meta.env.VITE_GITHUB_TOKEN_ID,
      },
    },
  );

  return resp.data;
};

const useUserList = (user, type) => {
  return useInfiniteQuery({
    queryKey: ["userList", { user, type }],
    queryFn: fetchUsers,
    initialPageParam: 1,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.length === 0 ? undefined : allPage.length + 1;
    },
  });
};

export default useUserList;
