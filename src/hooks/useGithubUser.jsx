import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUserData = async (user) => {
  if (!user) return null;

  const resp = await axios.get(`https://api.github.com/users/${user}`, {
    headers: {
      Authorization: import.meta.env.VITE_GITHUB_TOKEN_ID,
    },
  });
  return resp.data;
};

const useGithubUser = (username) => {
  return useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserData(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGithubUser;
