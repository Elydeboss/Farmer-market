import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo-black.svg";
import { X } from "lucide-react";
import {
  LayoutGrid,
  TrendingUp,
  Box,
  CreditCard,
  MapPin,
  CircleHelp,
  Headphones,
  Settings,
  User,
  LogOut,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const sectionTitle = ` font-bold text-sm text-gray-500 uppercase px-3 mt-4 mb-2`;

const Sidebar = ({ open, onClose }: Props) => {
  const linkclass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center font-bold text-sm gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
      isActive ? "text-pri " : "text-black hover:text-pri "
    }`;

  return (
    <>
      {/* BIG SCREEN SIDEBAR */}
      <aside className="font-dm-sans hidden min-h-screen overflow-y-auto md:flex md:flex-col md:w-63  ">
        <div className="ml-6 mt-3 mb-6 ">
          <NavLink to="/" className="text-2xl   cursor-pointer">
            <img src={Logo} alt="logo" className="w-[150px]" />
          </NavLink>
        </div>

        {/* MAIN TAB */}
        <div className="pl-4 w-full bg-[#f5f5f5]">
          <div className={sectionTitle}>Main</div>
          <nav className="flex flex-col gap-2 ml-3">
            <NavLink to="/buyerdashboard/overview" end className={linkclass}>
              <LayoutGrid className="w-5 h-5" /> Dashboard
            </NavLink>

            <NavLink to="/marketplace" className={linkclass}>
              <TrendingUp className="w-5 h-5" /> Marketplace
            </NavLink>
          </nav>

          {/* TRANSACTION TAB */}
          <div className={sectionTitle}>Transaction</div>
          <nav className="flex flex-col gap-2 ml-3">
            <NavLink to="/orders" className={linkclass}>
              <Box className="w-5 h-5" /> Order Management
            </NavLink>

            <NavLink to="/payment" className={linkclass}>
              <CreditCard className="w-5 h-5" /> Payments
            </NavLink>

            <NavLink to="/track" className={linkclass}>
              <MapPin className="w-5 h-5" /> Track Order
            </NavLink>
          </nav>

          {/* ACCOUNTS */}
          <div className={sectionTitle}>Accounts</div>
          <nav className="flex flex-col gap-2 ml-3">
            <NavLink to="/system" className={linkclass}>
              <CircleHelp className="w-5 h-5" />
              System
            </NavLink>

            <NavLink to="/support" className={linkclass}>
              <Headphones className="w-5 h-5" /> Support
            </NavLink>

            <NavLink to="/setting" className={linkclass}>
              <Settings className="w-5 h-5" /> Settings
            </NavLink>
          </nav>

          {/* USER */}
          <div className="mt-auto pl-3  py-15 ">
            <div className="flex items-center gap-3">
              <User className="w-11 h-11 p-2 bg-gray-200 rounded-full" />
              <div className="flex flex-col gap-0.5">
                <div className="font-semibold text-sm">John Caleb Ekong</div>
                <div className="text-sm font-medium text-[#999999]">Buyer</div>
              </div>
            </div>

            <button className="mt-4 flex items-center ml-4 font-semibold gap-2 cursor-pointer text-black">
              <LogOut className="w-4 h-4 font-bold" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE RESPONSIVENESS */}
      {open && (
        <div className="fixed  inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={onClose}
          ></div>
          <div className="absolute left-0 top-0 h-full w-72 min-h-screen overflow-x-auto bg-white py-4  shadow">
            <div className="flex items-center px-4  w-full justify-between mb-6">
              <NavLink to="/" className="text-2xl  cursor-pointer">
                <img src={Logo} alt="logo" className="w-[120px]" />
              </NavLink>

              <button
                onClick={onClose}
                className="text-gray-600"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-black font-bold cursor-pointer" />
              </button>
            </div>

            {/* MAIN TAB */}
            <div className="pl-4 py-3  w-full bg-[#f5f5f5]">
              <div className={sectionTitle}>Main</div>
              <nav className="flex flex-col gap-2 ml-3">
                <NavLink
                  to="/buyerdashboard/overview"
                  end
                  className={linkclass}
                >
                  <LayoutGrid className="w-5 h-5" /> Dashboard
                </NavLink>

                <NavLink to="/marketplace" className={linkclass}>
                  <TrendingUp className="w-5 h-5" /> Marketplace
                </NavLink>
              </nav>

              {/* TRANSACTION TAB */}
              <div className={sectionTitle}>Transaction</div>
              <nav className="flex flex-col gap-2 ml-3">
                <NavLink to="/orders" className={linkclass}>
                  <Box className="w-5 h-5" /> Order Management
                </NavLink>

                <NavLink to="/payment" className={linkclass}>
                  <CreditCard className="w-5 h-5" /> Payments
                </NavLink>

                <NavLink to="/track" className={linkclass}>
                  <MapPin className="w-5 h-5" /> Track Order
                </NavLink>
              </nav>

              {/* ACCOUNTS */}
              <div className={sectionTitle}>Accounts</div>
              <nav className="flex flex-col gap-2 ml-3">
                <NavLink to="/system" className={linkclass}>
                  <CircleHelp className="w-5 h-5" />
                  System
                </NavLink>

                <NavLink to="/support" className={linkclass}>
                  <Headphones className="w-5 h-5" /> Support
                </NavLink>

                <NavLink to="/setting" className={linkclass}>
                  <Settings className="w-5 h-5" /> Settings
                </NavLink>
              </nav>

              {/* USER */}
              <div className="mt-auto pl-3  py-15 ">
                <div className="flex items-center gap-3">
                  <User className="w-11 h-11 p-2 bg-gray-200 rounded-full" />
                  <div className="flex flex-col gap-0.5">
                    <div className="font-semibold text-sm">
                      John Caleb Ekong
                    </div>
                    <div className="text-sm font-medium text-[#999999]">
                      Buyer
                    </div>
                  </div>
                </div>

                <button className="mt-4 flex items-center ml-4 font-semibold gap-2 cursor-pointer text-black">
                  <LogOut className="w-4 h-4 font-bold" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
