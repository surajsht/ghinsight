import { IoSearch } from "react-icons/io5";

const SearchBar = ({ value, setValue }) => {
  return (
    <div className="relative mt-8">
      <input
        type="text"
        placeholder="Search GitHub username..."
        className="w-full rounded-xl border border-primary p-4 pl-14 focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IoSearch className="absolute left-4 top-1/2 translate-y-[-50%] text-2xl text-primary" />
    </div>
  );
};

export default SearchBar;
