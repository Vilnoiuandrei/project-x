import { NavLink } from "react-router-dom";
import { FaCar, FaHome, FaSignInAlt } from "react-icons/fa";
function PageNav() {
  return (
    <nav className="w-ws fixed  bottom-0 z-40 flex h-20 w-svw items-center  justify-center bg-red-800 text-xl md:h-20 md:text-3xl">
      <ul
        className="flex justify-center
       space-x-24 md:space-x-36"
      >
        <li className=" text-white hover:text-gray-400">
          <NavLink className="flex items-center" to="/cars">
            <FaCar className="mb-2 mr-2 h-8 w-8" />
            Cars
          </NavLink>
        </li>
        <li className="text-white hover:text-gray-400">
          <NavLink className="flex items-center" to="/">
            <FaHome className="mb-2 mr-2 h-8 w-8" />
            Home
          </NavLink>
        </li>
        <li className="text-white hover:text-gray-400">
          <NavLink className="flex items-center" to="/login">
            <FaSignInAlt className="mb-2 mr-2 h-8 w-8" />
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default PageNav;
