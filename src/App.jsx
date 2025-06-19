import { Routes, Route } from "react-router";
import Home from "./page/Home";
import Followers from "./page/Followers";
import { useState, useEffect } from "react";

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
    <Routes>
      <Route path="/" element={<Home value={value} debouncedValue={debouncedValue} setValue={setValue} />} />
      <Route path="/followers/:user" element={<Followers />} />
    </Routes>
  );
};

export default App;
