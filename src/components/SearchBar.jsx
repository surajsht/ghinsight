import { IoSearch } from "react-icons/io5";

const SearchBar = ({ value, setValue }) => {
  return (
    <div className="relative mt-8">
      <input
        type="text"
        placeholder="Search GitHub username..."
        className="dark:bg-black-rgba-light dark:border-black-rgba-light w-full rounded-xl border border-primary p-4 pl-14 focus:outline-none dark:text-white"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IoSearch className="absolute left-4 top-1/2 translate-y-[-50%] text-2xl text-primary dark:text-primary-dark" />
    </div>
  );
};

export default SearchBar;
