const UserDataLoader = () => {
  return (
    <div className="mt-8 rounded-3xl bg-white p-4 dark:bg-black-rgba dark:text-white sm:p-8">
      <div className="flex animate-pulse flex-col justify-between gap-6">
        <div className="flex w-full items-center gap-4 border-b-2 pb-4">
          <div className="h-28 w-28 rounded-full bg-gray-300"></div>

          <div>
            <div className="mb-3 h-5 w-48 rounded bg-gray-300"></div>
            <div className="h-4 w-20 rounded bg-gray-300"></div>
          </div>
        </div>

        <div className="flex flex-1 flex-wrap gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <div className="h-3 w-32 rounded bg-gray-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDataLoader;
