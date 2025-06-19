const UserListLoader = () => {
  return (
    <div className="mt-10 rounded-3xl bg-white p-4 dark:bg-black-rgba sm:p-8 animate-pulse">
      <div className="mb-9 flex items-center justify-between gap-2">
        <div className="h-7 w-44 bg-gray-300"></div>
        <div className="h-8 w-28 bg-gray-300"></div>
      </div>

      <div className="sm:flex sm:flex-wrap sm:gap-4">
        {Array.from({ length: 6 }).map((_, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 sm:w-[calc(50%-8px)] sm:rounded-xl sm:border-2 sm:p-4 [&:not(:first-child)]:mt-6 [&:not(:first-child)]:border-t-2 [&:not(:first-child)]:pt-6 sm:[&:not(:first-child)]:mt-0 sm:[&:not(:first-child)]:border-t-2 sm:[&:not(:first-child)]:pt-4"
            >
              <div className="h-36 w-36 rounded-full bg-gray-300"></div>
              <div className="h-6 w-32 bg-gray-300"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserListLoader;
