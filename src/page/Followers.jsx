import FollowersList from "../components/FollowersList";
import Navbar from "../components/Navbar";

const Followers = () => {
  return (
    <div className="dark:bg-dark-mode min-h-screen bg-gray-100 py-10 font-sans">
      <div className="container">
        <Navbar />
        <FollowersList />
      </div>
    </div>
  );
};

export default Followers;
