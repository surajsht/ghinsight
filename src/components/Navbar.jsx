import { useState, useEffect } from "react";
import { Link } from "react-router";

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
        <h1 className="text-3xl font-bold dark:text-white sm:text-4xl">
          <Link to="/" aria-label="Go to home">
            <span className="text-primary dark:text-primary-dark">Gh</span>
            Insight
          </Link>
        </h1>

        <div
          className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-300 ${darkMode ? "bg-primary dark:bg-primary-dark" : "bg-gray-300"}`}
          onClick={() => setDarkMode(!darkMode)}
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
