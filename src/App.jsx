import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import UserData from "./components/UserData";
import RecentRepo from "./components/RecentRepo";

const App = () => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-14 font-sans dark:bg-[#121212]">
        <div className="container">
          <div className="rounded-3xl bg-white p-4 sm:p-8">
            <Navbar />
            <SearchBar value={value} setValue={setValue} />
          </div>

          <UserData value={debouncedValue} />

          <div className="mt-8 rounded-3xl bg-white p-4 sm:p-8">
            <RecentRepo value={debouncedValue} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
