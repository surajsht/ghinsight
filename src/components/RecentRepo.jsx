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
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN_ID}`,
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

  return (
    <div>
      <div className={`${isFetching ? "bg-slate-500" : ""}`}>
        {data?.repos?.map((repo) => {
          return (
            <div key={repo?.id}>
              <h2 className="mb-2 text-xl font-bold">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {repo?.name}
                </a>
              </h2>

              <p className="mb-4"> {repo?.description} </p>

              <div className="flex items-center gap-2">
                <FaStar style={{ color: "#e3b341" }} />
                <span>{repo?.stargazers_count}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCodeFork />
                <span>Fork Count: {repo?.forks_count}</span>
              </div>

              <div>
                <span
                  className={`block h-3 w-3 rounded-full ${languageColors[repo?.language] || languageColors["Other"]}`}
                ></span>
                {repo?.language}
              </div>

              <span>
                Last updated: {new Date(repo?.updated_at).toLocaleDateString()}
              </span>
            </div>
          );
        })}
      </div>

      <div>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>{page}</span>

        <button
          onClick={() => {
            if (!data?.hasNextPage) return;
            setPage((old) => old + 1);
          }}
          disabled={!data?.hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentRepo;
