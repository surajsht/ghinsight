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

const UserList = ({ value }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", value],
    queryFn: () => getUserData(value),
    enabled: !!value,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error {error.message} </div>;

  console.log(data);

  return (
    <div>
      <span> User name: {data?.login} </span>
      <h2>{data?.name}</h2>
      <p>{data?.bio || "No bio added"}</p>
      <span> {data?.email || "email not included"} </span>
      <span> Public repos: {data?.public_repos} </span>
      <img src={data?.avatar_url} alt={data?.name} />
      <span> Followers:{data?.followers} </span>
      <span> Following:{data?.following} </span>
      <span>
        {" "}
        Created at: {new Date(data?.created_at).toLocaleDateString()}{" "}
      </span>
      <span>
        {" "}
        Updated at: {new Date(data?.updated_at).toLocaleDateString()}{" "}
      </span>
      <span> {data?.location || "Location not included"} </span>
      <span className="text-secondary"> Followers </span>
    </div>
  );
};

export default UserList;
