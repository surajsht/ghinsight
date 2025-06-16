import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="relative mt-8">
      <input
        type="text"
        placeholder="Search GitHub username..."
        className="border-primary w-full rounded-xl border p-4 pl-14 focus:outline-none"
      />
      <IoSearch className="text-primary absolute left-4 top-1/2 translate-y-[-50%] text-2xl" />
    </div>
  );
};

export default SearchBar;
