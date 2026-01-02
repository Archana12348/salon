import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-7xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">
        Oops! The page you are looking for does not exist.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Home
        </Link>

        <Link
          to="/login"
          className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-200"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
