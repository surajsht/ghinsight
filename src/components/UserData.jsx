import { IoCreateOutline } from "react-icons/io5";
import { MdBrowserUpdated } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { PiUsersBold } from "react-icons/pi";
import UserDataLoader from "./loader/UserDataLoader";
import ErrorState from "./ErrorState";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router";
import useGithubUser from "../hooks/useGithubUser";

const UserData = ({ username }) => {
  const { data, isLoading, error } = useGithubUser(username);

  if (isLoading) return <UserDataLoader />;
  if (error) return <ErrorState message={error.message} />;
  if (!data) return null;

  return (
    <div className="mt-8 rounded-3xl bg-white p-4 dark:bg-black-rgba dark:text-white sm:p-8">
      <div className="flex flex-col justify-between gap-6">
        <div className="flex w-full items-center gap-4 border-b-2 pb-4">
          <div className="h-28 w-28 overflow-hidden rounded-full">
            <LazyLoadImage
              alt={data?.name || "Github user"}
              height={112}
              src={data?.avatar_url}
              width={112}
              effect="blur"
              placeholderSrc="/fallback.jpg"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover sm:text-2xl">
              <a
                href={data?.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data?.name}
              </a>
            </h2>

            <h2 className="mb-2 font-semibold text-black/75 dark:text-text-black-rgba">
              @{data?.login}
            </h2>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:flex-wrap">
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
            <Link
              to={`/followers/${username}`}
              aria-label="Go to followers"
              className="text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover"
            >
              Followers:
            </Link>
            {data?.followers}
          </div>

          <div className="flex items-center gap-2">
            <FaRegUser />
            <Link
              to={`/following/${username}`}
              aria-label="Go to following"
              className="text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover"
            >
              Following:
            </Link>
            {data?.following}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
