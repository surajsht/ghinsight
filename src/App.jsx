import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-14 font-sans dark:bg-[#121212]">
        <div className="container">
          <div className="rounded-3xl bg-white p-8">
            <Navbar />
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
