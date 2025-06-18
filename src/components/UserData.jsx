import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoCreateOutline } from "react-icons/io5";
import { MdBrowserUpdated } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { PiUsersBold } from "react-icons/pi";

const getUserData = async (user) => {
  if (!user) return null;

  const resp = await axios.get(`https://api.github.com/users/${user}`, {
    headers: {
      Authorization: import.meta.env.VITE_GITHUB_TOKEN_ID,
    },
  });
  return resp.data;
};

const UserData = ({ value }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", value],
    queryFn: () => getUserData(value),
    enabled: !!value,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error {error.message} </div>;

  if (!data) return null;

  return (
    <div className="mt-8 rounded-3xl bg-white p-4 sm:p-8">
      <div className="flex flex-col justify-between gap-6">
        <div className="flex w-full items-center gap-4 border-b-2 pb-4">
          <img
            src={data?.avatar_url}
            alt={data?.name}
            className="h-w-28 w-28 rounded-full object-cover"
          />

          <div>
            <h2 className="text-xl font-bold sm:text-2xl">{data?.name}</h2>

            <h2 className="mb-2 font-semibold text-black/75">@{data?.login}</h2>
          </div>
        </div>

        <div className="flex flex-1 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <MdOutlineEmail />
            <span>{data?.email || "Email not included"}</span>
          </div>

          <div className="flex items-center gap-2">
            <IoLocationOutline className="text-sm" />
            <span>{data?.location || "Location not included"}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaRegFolderOpen />
            <span>Public repos:</span>
            <span>{data?.public_repos}</span>
          </div>

          <div className="flex items-center gap-2">
            <IoCreateOutline />
            <span>Created at: </span>
            <span>{new Date(data?.created_at).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <MdBrowserUpdated />
            <span>Updated at:</span>
            <span>{new Date(data?.updated_at).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <PiUsersBold />
            <span className="text-primary"> Followers: </span>
            {data?.followers}
          </div>

          <div className="flex items-center gap-2">
            <FaRegUser />
            <span className="text-primary">Following: </span>
            {data?.following}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
