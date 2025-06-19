import { Routes, Route } from "react-router";
import Home from "./page/Home";
import Followers from "./page/Followers";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/followers/:user" element={<Followers />} />
    </Routes>
  );
};

export default App;
