import { LazyLoadImage } from "react-lazy-load-image-component";

const UserCardList = ({ users }) => {
  return (
    <div className="sm:flex sm:flex-wrap sm:gap-4">
      {users.map((user) => {
        return (
          <div
            key={user?.id}
            className="flex flex-col items-center justify-center gap-4 sm:w-[calc(50%-8px)] sm:rounded-xl sm:border-2 sm:p-4 [&:not(:first-child)]:mt-6 [&:not(:first-child)]:border-t-2 [&:not(:first-child)]:pt-6 sm:[&:not(:first-child)]:mt-0 sm:[&:not(:first-child)]:border-t-2 sm:[&:not(:first-child)]:pt-4"
          >
            <div className="h-36 w-36 overflow-hidden rounded-full">
              <LazyLoadImage
                alt={user.login || "Github user"}
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
  );
};

export default UserCardList;
