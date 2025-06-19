import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import ErrorState from "./ErrorState";
import UserListLoader from "./skeletonLoader/UserListLoader";

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

const UserList = ({ type }) => {
  const { user } = useParams();
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["userList", { user, type }],
    queryFn: fetchUsers,
    initialPageParam: 1,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.length === 0 ? undefined : allPage.length + 1;
    },
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (isLoading) return <UserListLoader />;
  if (error)
    return (
      <div className="text-center">
        <ErrorState message={error.message} />
        <button
          className="mt-4 rounded-xl bg-primary px-5 py-2 text-base font-medium text-white transition duration-200 hover:bg-primary-hover dark:bg-primary-dark dark:text-black/80 dark:hover:bg-primary-hover dark:hover:text-white"
          onClick={() => navigate("/")}
        >
          Goto Home
        </button>
      </div>
    );

  return (
    <div className="mt-10 rounded-3xl bg-white p-4 dark:bg-black-rgba sm:p-8">
      <h2 className="mb-9 border-l-4 border-primary pl-4 text-2xl font-medium dark:border-primary-dark dark:text-white">
        {type} by {user}
      </h2>

      <div className="sm:flex sm:flex-wrap sm:gap-4">
        {data?.pages?.flat().map((user) => {
          return (
            <div
              key={user?.id}
              className="flex flex-col items-center justify-center gap-4 sm:w-[calc(50%-8px)] sm:rounded-xl sm:border-2 sm:p-4 [&:not(:first-child)]:mt-6 [&:not(:first-child)]:border-t-2 [&:not(:first-child)]:pt-6 sm:[&:not(:first-child)]:mt-0 sm:[&:not(:first-child)]:border-t-2 sm:[&:not(:first-child)]:pt-4"
            >
              <div className="h-36 w-36 overflow-hidden rounded-full">
                <LazyLoadImage
                  alt={user.login}
                  height={144}
                  src={user.avatar_url}
                  width={144}
                  effect="blur"
                  placeholderSrc="/fallback.jpg"
                  className="h-full w-full object-cover"
                />
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover"
              >
                {user.login}
              </a>
            </div>
          );
        })}
      </div>

      {hasNextPage && <div ref={ref}></div>}

      {isFetchingNextPage && (
        <h2 className="mt-6 text-center text-xl dark:text-white sm:text-2xl">
          Fetching New Users...
        </h2>
      )}

      <button
        onClick={() => navigate("/")}
        aria-label="Go to Home"
        title="Go to Home"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-3 text-white shadow-lg transition hover:bg-primary-hover dark:bg-primary-dark dark:text-black/80 dark:hover:bg-primary-hover dark:hover:text-white"
      >
        <FaHome size={26} />
      </button>
    </div>
  );
};

export default UserList;
