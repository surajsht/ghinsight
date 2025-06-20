import { useParams } from "react-router";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import ErrorState from "./ErrorState";
import UserListLoader from "./skeletonLoader/UserListLoader";
import useUserList from "../hooks/useUserList";
import UserCard from "./UserCard";

const UserList = ({ type }) => {
  const { user } = useParams();
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useUserList(user, type);

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

      <UserCard users={data?.pages?.flat()} />

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
