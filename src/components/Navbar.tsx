import { NavLink } from "react-router-dom";
import NavLogo from "../assets/Home-Images/Logo 2.svg";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className=" bg-pri text-white h-[94px]">
      <div className="max-w-[1100px] px-5 flex justify-between items-center  w-full h-full mx-auto">
        <NavLink to="/" className="text-2xl  w-[150px] cursor-pointer">
          <img src={NavLogo} alt="logo" />
        </NavLink>

        <ul className="flex space-x-12">
          <NavLink
            to="/"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? `font-bold text-sec hover:text-sec`
                : `font-bold text-light-2`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? `font-bold text-sec hover:text-sec`
                : `font-bold text-light-2`
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/pages"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? `font-bold text-sec hover:text-sec`
                : `font-bold text-light-2`
            }
          >
            Pages
          </NavLink>
        </ul>

        <div>
         <Link to="/createaccount"> <button className="border-0 outline-0 cursor-pointer bg-sec text-black text-sm font-bold py-3 px-5 rounded-md hover:bg-sec2">
            Sign Up / Log In
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
