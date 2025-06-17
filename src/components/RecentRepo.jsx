import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getRepoData = async (user) => {
  if (!user) return null;

  const resp = await axios.get(`https://api.github.com/users/${user}/repos`, {
    headers: {
      Authorization: import.meta.env.VITE_GITHUB_TOKEN_ID,
    },
  });
  return resp.data;
};

const RecentRepo = ({ value }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["repos", value],
    queryFn: () => getRepoData(value),
    enabled: !!value,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error {error.message} </div>;

  return <div>RecentRepo</div>;
};

export default RecentRepo;
