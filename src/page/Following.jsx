import FollowingList from "../components/FollowingList";
import Navbar from "../components/Navbar";

const Following = () => {
  return (
    <div className="dark:bg-dark-mode min-h-screen bg-gray-100 py-10 font-sans">
      <div className="container">
        <Navbar />
        <FollowingList />
      </div>
    </div>
  );
};

export default Following;
