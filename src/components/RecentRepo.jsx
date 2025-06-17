import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { languageColors } from "../constants/LanguageColors";

const getRepoData = async (user) => {
  if (!user) return null;

  const resp = await axios.get(`https://api.github.com/users/${user}/repos`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN_ID}`,
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

  return (
    <div>
      {data?.map((repo) => {
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
              <span className={`block h-3 w-3 rounded-full ${languageColors[repo?.language] || languageColors['Other']}`}></span>
              {repo?.language}
            </div>

            <span>
              Last updated: {new Date(repo?.updated_at).toLocaleDateString()}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RecentRepo;
