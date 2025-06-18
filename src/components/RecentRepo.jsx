import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { languageColors } from "../constants/LanguageColors";
import { useState } from "react";

const getRepoData = async (user, page) => {
  if (!user) return null;

  const res = await axios.get(
    `https://api.github.com/users/${user}/repos?page=${page}&per_page=10`,
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

const RecentRepo = ({ value }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching, isError } = useQuery({
    queryKey: ["repos", value, page],
    queryFn: () => getRepoData(value, page),
    enabled: !!value,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error {error.message} </div>;

  if (!data) return null;

  console.log(data.repos);

  return (
    <div className="mt-8">
      <div className="flex flex-col flex-wrap justify-between gap-4 md:flex-row">
        {data?.repos?.map((repo) => {
          return (
            <div
              key={repo?.id}
              className="dark:bg-black-rgba flex flex-col flex-wrap items-start justify-center gap-2 rounded-3xl bg-white p-4 dark:text-white sm:p-8 md:w-[calc(50%-8px)]"
            >
              <h2 className="text-2xl font-bold">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover text-blue-600"
                >
                  {repo?.name}
                </a>
              </h2>

              {repo?.description && <p> {repo?.description} </p>}

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
          disabled={page === 1}
          className="hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary-hover rounded-lg bg-blue-500 px-4 py-2 text-white transition disabled:cursor-not-allowed disabled:opacity-50 dark:text-black/80 dark:hover:text-white"
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
          disabled={!data?.hasNextPage}
          className="hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary-hover rounded-lg bg-blue-500 px-4 py-2 text-white transition disabled:cursor-not-allowed disabled:opacity-50 dark:text-black/80 dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentRepo;
