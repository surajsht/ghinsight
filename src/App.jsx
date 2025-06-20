import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import PageLoader from "./components/loader/PageLoader";
const Home = lazy(() => import("./page/Home"));
const UserListPage = lazy(() => import("./page/UserListPage"));
const NotFound = lazy(() => import("./page/NotFound"));

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
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
};

export default App;
