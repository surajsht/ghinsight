import { FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { languageColors } from "../constants/LanguageColors";
import { useEffect, useState } from "react";
import RecentRepoLoader from "./loader/RecentRepoLoader";
import ErrorState from "./ErrorState";
import useUserRepos from "../hooks/useUserRepos";

const RecentRepo = ({ username }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useUserRepos(username, page);

  useEffect(() => {
    setPage(1);
  }, [username]);

  if (isLoading) return <RecentRepoLoader />;
  if (error) return <ErrorState message={error.message} />;
  if (!data) return null;

  return (
    <div className="mt-8">
      <div className="flex flex-col flex-wrap justify-between gap-4 md:flex-row">
        {data?.repos?.map((repo) => {
          return (
            <div
              key={repo?.id}
              className="flex flex-col flex-wrap items-start justify-start gap-2 rounded-3xl bg-white p-4 dark:bg-black-rgba dark:text-white sm:p-8 md:w-[calc(50%-8px)]"
            >
              <h2 className="text-2xl font-bold">
                <a
                  href={repo?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover"
                >
                  {repo?.name.length > 18
                    ? repo.name.slice(0, 18) + "..."
                    : repo.name}
                </a>
              </h2>

              {repo?.description && (
                <p>
                  {repo.description.length > 30
                    ? repo.description.slice(0, 50) + "..."
                    : repo.description}
                </p>
              )}

              <div className="flex items-center gap-2">
                <span
                  className={`block h-3 w-3 rounded-full ${languageColors[repo?.language] || languageColors["Other"]}`}
                ></span>
                {repo?.language || "Other"}
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <FaStar style={{ color: "#e3b341" }} />
                  <span>{repo?.stargazers_count}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaCodeFork />
                  <span>Fork Count: {repo?.forks_count}</span>
                </div>
              </div>

              <span>
                Last updated: {new Date(repo?.updated_at).toLocaleDateString()}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1 || isFetching}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-dark dark:text-black/80 dark:hover:bg-primary-hover dark:hover:text-white"
        >
          Previous
        </button>

        <span className="rounded border border-gray-300 px-4 py-2 text-lg font-medium dark:text-white">
          {page}
        </span>

        <button
          onClick={() => {
            if (!data?.hasNextPage) return;
            setPage((old) => old + 1);
          }}
          disabled={!data?.hasNextPage || isFetching}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-dark dark:text-black/80 dark:hover:bg-primary-hover dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentRepo;
