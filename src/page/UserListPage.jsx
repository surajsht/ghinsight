import Navbar from "../components/Navbar";
import UserList from "../components/UserList";

const UserListPage = ({ type }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 font-sans dark:bg-dark-mode">
      <div className="container">
        <Navbar />
        <UserList type={type} />
      </div>
    </div>
  );
};

export default UserListPage;
