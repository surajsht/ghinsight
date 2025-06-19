import { useParams } from "react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const fetchFollowers = async ({ pageParam, queryKey }) => {
  const user = queryKey[1];
  const resp = await axios.get(
    `https://api.github.com/users/${user}/followers?page=${pageParam}&per_page=10`,
    {
      headers: {
        Authorization: import.meta.env.VITE_GITHUB_TOKEN_ID,
      },
    },
  );

  return resp.data;
};

const Followers = () => {
  const { user } = useParams();
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["followers", user],
    queryFn: fetchFollowers,
    initialPageParam: 1,
    enabled: !!user,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2> Error: {error.message} </h2>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 font-sans dark:bg-[#121212]">
      <div className="container">
        <div className="rounded-3xl bg-white p-4 dark:bg-black-rgba sm:p-8">
          <div className="sm:flex sm:flex-wrap sm:gap-4">
            {data.pages.flat().map((follower) => {
              return (
                <div
                  key={follower?.id}
                  className="flex flex-col items-center justify-center gap-4 sm:w-[calc(50%-8px)] sm:rounded-xl sm:border-2 sm:p-4 [&:not(:first-child)]:mt-6 [&:not(:first-child)]:border-t-2 [&:not(:first-child)]:pt-6 sm:[&:not(:first-child)]:mt-0 sm:[&:not(:first-child)]:border-t-2 sm:[&:not(:first-child)]:pt-4"
                >
                  <img
                    src={follower.avatar_url}
                    alt={follower.login}
                    className="mx-auto h-36 w-36 rounded-full"
                  />
                  <a
                    href={follower.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primar-hover dark:hover:text-primar-hover text-2xl text-primary dark:text-primary-dark"
                  >
                    {follower.login}
                  </a>
                </div>
              );
            })}
          </div>

          {hasNextPage && <div ref={ref}></div>}

          {isFetchingNextPage && <div> Fetching... </div>}

          {/* <button onClick={() => fetchNextPage()}> fetch more </button> */}
        </div>
      </div>
    </div>
  );
};

export default Followers;
