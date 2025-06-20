import { lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import UserData from "../components/UserData";
import LoadingFallBack from "../components/loader/LoadingFallback"
const RecentRepo = lazy(() => import("../components/RecentRepo"));

const Home = ({ value, debouncedValue, setValue }) => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 font-sans dark:bg-dark-mode">
        <div className="container">
          <div className="rounded-3xl bg-white p-4 dark:bg-black-rgba sm:p-8">
            <Navbar />
            <SearchBar value={value} setValue={setValue} />
          </div>

          <UserData username={debouncedValue} />

          <Suspense fallback={<LoadingFallBack />}>
            {debouncedValue && <RecentRepo username={debouncedValue} />}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Home;
