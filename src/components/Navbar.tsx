import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // install lucide-react for icons
import NavLogo from "../assets/Home-Images/Logo 2.svg";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-pri text-white h-[94px] relative z-50">
      <div className="max-w-[1100px] px-5 flex justify-between items-center w-full h-full mx-auto">
        {/* Logo */}
        <NavLink to="/" className="w-[150px] cursor-pointer">
          <img src={NavLogo} alt="logo" />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-12">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `font-bold text-sec hover:text-sec`
                : `font-bold text-light-2`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? `font-bold text-sec hover:text-sec`
                : `font-bold text-light-2`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/pages"
            className={({ isActive }) =>
              isActive
                ? `font-bold text-sec hover:text-sec`
                : `font-bold text-light-2`
            }
          >
            Pages
          </NavLink>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/createaccount">
            <button className="bg-sec text-black text-sm font-bold py-3 px-5 rounded-md hover:bg-sec2">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="block lg:hidden bg-sec text-black text-sm font-bold py-3 px-5 rounded-md hover:bg-sec2">
              Log In
            </button>
          </Link>

          <Link to="/signin">
            {" "}
            <button className="border-0 outline-0 cursor-pointer bg-sec text-black text-sm font-bold py-3 px-3 rounded-md hover:bg-sec2">
              Log In
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-pri text-white px-5 py-4 space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `block font-bold text-sec`
                : `block font-bold text-light-2`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? `block font-bold text-sec`
                : `block font-bold text-light-2`
            }
            onClick={() => setIsOpen(false)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/pages"
            className={({ isActive }) =>
              isActive
                ? `block font-bold text-sec`
                : `block font-bold text-light-2`
            }
            onClick={() => setIsOpen(false)}
          >
            Pages
          </NavLink>

          <div className="flex flex-col gap-3 pt-4">
            <Link to="/createaccount" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-sec text-black text-sm font-bold py-3 px-5 rounded-md hover:bg-sec2">
                Sign Up
              </button>
            </Link>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-sec text-black text-sm font-bold py-3 px-5 rounded-md hover:bg-sec2">
                Login In
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
