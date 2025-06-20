import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getRepoData = async (username, page) => {
  if (!username) return null;

  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?page=${page}&per_page=10`,
    {
      headers: {
        Authorization: import.meta.env.VITE_GITHUB_TOKEN_ID,
      },
    },
  );

  const data = res.data;

  const linkHeader = res.headers["link"];

  let hasNextPage = false;

  if (linkHeader && linkHeader.includes('rel="next"')) {
    hasNextPage = true;
  }

  return {
    repos: data,
    hasNextPage,
  };
};

const useUserRepos = (username, page) => {
  return useQuery({
    queryKey: ["repos", username, page],
    queryFn: () => getRepoData(username, page),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
};

export default useUserRepos;
