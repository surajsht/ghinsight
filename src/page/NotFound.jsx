import Navbar from "../components/Navbar";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-8 dark:bg-dark-mode">
      <div className="container">
        <div className="rounded-3xl bg-white p-4 dark:bg-black-rgba sm:p-8">
          <Navbar />

          <div className="mt-12 pb-4 flex flex-col items-center justify-center">
            <h1 className="text-7xl font-extrabold text-primary dark:text-primary-dark">
              404
            </h1>
            <p className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
              Oops! Page not found.
            </p>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              The page you are looking for doesn't exist.
            </p>

            <Link
              to="/"
              className="mt-6 flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-lg font-medium text-white transition hover:bg-primary-hover dark:bg-primary-dark dark:text-black/80 dark:hover:bg-primary-hover dark:hover:text-white"
            >
              <FaHome size={20} />
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
