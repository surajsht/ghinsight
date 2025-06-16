import { useState, useEffect } from "react";

const getDarkModeStatus = () =>
  JSON.parse(localStorage.getItem("darkMode")) || false;

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(getDarkModeStatus);

  useEffect(() => {
    let documentBody = document.body;
    darkMode === true
      ? documentBody.classList.add("dark")
      : documentBody.classList.remove("dark");

    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    return () => documentBody.classList.remove("dark");
  }, [darkMode]);

  return (
    <nav>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold sm:text-4xl">
          <span className="text-primary">Gh</span>
          Insight
        </h1>

        <div
          className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-300 ${darkMode ? "bg-primary" : "bg-gray-300"}`}
          onClick={() => JSON.stringify(setDarkMode(!darkMode))}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${darkMode ? "translate-x-5" : ""}`}
          ></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
