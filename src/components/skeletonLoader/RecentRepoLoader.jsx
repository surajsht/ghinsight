const RecentRepoLoader = () => {
  return (
    <div className="mt-8">
      <div className="flex animate-pulse flex-col flex-wrap justify-between gap-4 md:flex-row">
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <div
              key={index}
              className="flex flex-col flex-wrap items-start justify-center gap-2 rounded-3xl bg-white p-4 dark:bg-black-rgba dark:text-white sm:p-8 md:w-[calc(50%-8px)]"
            >
              <div className="mb-3 h-6 w-36 bg-gray-300"></div>

              <div className="mb-2 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                <div className="h-3 w-16 bg-gray-300"></div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                  <div className="h-4 w-4 bg-gray-300"></div>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                  <div className="h-4 w-28 bg-gray-300"></div>
                </div>
              </div>

              <div className="h-4 w-28 bg-gray-300"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentRepoLoader;
