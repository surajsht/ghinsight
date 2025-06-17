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

const getRepoData = async (user) => {
  if (!user) return null;

  const resp = await axios.get(`https://api.github.com/users/${user}/repos`, {
    headers: {
      Authorization: import.meta.env.VITE_GITHUB_TOKEN_ID,
    },
  });
  return resp.data;
};

const UserList = ({ value }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", value],
    queryFn: () => getUserData(value),
    enabled: !!value,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error {error.message} </div>;

  return (
    <div>
      <span> User name: {data?.login} </span>
      <h2>{data?.name}</h2>
      <img src={data?.avatar_url} alt={data?.name} />
      <span> Followers:{data?.followers} </span>
      <span> Following:{data?.following} </span>
    </div>
  );
};

export default UserList;
