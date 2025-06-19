import { Routes, Route } from "react-router";
import Home from "./page/Home";
import Followers from "./page/Followers";
import { useState, useEffect } from "react";
import Following from "./page/Following";

const getSearchInput = () => {
  return JSON.parse(sessionStorage.getItem("searchInput")) || "";
};

const App = () => {
  const [value, setValue] = useState(getSearchInput);
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      let trimmed = value.trim();
      setDebouncedValue(trimmed);
      sessionStorage.setItem("searchInput", JSON.stringify(trimmed));
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            value={value}
            debouncedValue={debouncedValue}
            setValue={setValue}
          />
        }
      />
      <Route path="/followers/:user" element={<Followers />} />
      <Route path="/following/:user" element={<Following />} />
    </Routes>
  );
};

export default App;
