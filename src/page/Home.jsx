import "react-lazy-load-image-component/src/effects/blur.css";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import UserData from "../components/UserData";
import RecentRepo from "../components/RecentRepo";

const Home = ({ value, debouncedValue, setValue }) => {
  return (
    <>
      <div className="dark:bg-dark-mode min-h-screen bg-gray-100 py-10 font-sans">
        <div className="container">
          <div className="rounded-3xl bg-white p-4 dark:bg-black-rgba sm:p-8">
            <Navbar />
            <SearchBar value={value} setValue={setValue} />
          </div>

          <UserData value={debouncedValue} />

          {debouncedValue && <RecentRepo value={debouncedValue} />}
        </div>
      </div>
    </>
  );
};

export default Home;
