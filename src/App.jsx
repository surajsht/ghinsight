import { Routes, Route } from "react-router";
import Home from "./page/Home";
import { useState, useEffect } from "react";
import UserListPage from "./page/UserListPage";
import NotFound from "./page/NotFound";

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
      <Route
        path="/followers/:user"
        element={<UserListPage type="followers" />}
      />
      <Route
        path="/following/:user"
        element={<UserListPage type="following" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
