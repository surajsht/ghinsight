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
      setDebouncedValue(value.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 font-sans dark:bg-[#121212]">
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

export default App;
