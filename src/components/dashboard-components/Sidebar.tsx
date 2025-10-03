import { NavLink } from "react-router-dom";
<<<<<<< HEAD
import Logo from "../../assets/Logo-black.svg";
import { X } from "lucide-react";
import Image from "../../assets/marketplace-images/Ellipse 1.svg";
import {
  LayoutGrid,
  TrendingUp,
  Box,
  CreditCard,
  MapPin,
  CircleHelp,
  Headphones,
  Settings,
  LogOut,
} from "lucide-react";
=======
import { useState } from "react";
import { Send, Settings, LogOut, CircleQuestionMark } from "lucide-react";
>>>>>>> 80c4558e1e8041c1f3b2f7b7fb5029198e2a0954

import Logo from "../../assets/Group(1).png";
import Monitor from "../../assets/monitor-mobbile.png";
import Support from "../../assets/material-symbols-light_support-agent-outline.png";
import Group from "../../assets/Group.png";
import Track from "../../assets/solar_gps-outline.png";
import Wallet from "../../assets/solar_wallet-outline.png";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  {
    /* Overlay (click to close) */
  }
  {
    sidebarOpen && (
      <div
        className="fixed inset-0 bg-black/30 z-40 md:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    );
  }

<<<<<<< HEAD
const Sidebar = ({ open, onClose }: Props) => {
  const linkclass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center font-bold text-sm gap-3 px-3 mb-2 rounded-md transition-colors duration-200 ${
      isActive ? "text-pri " : "text-black hover:text-pri "
    }`;

  return (
    <>
      {/* BIG SCREEN SIDEBAR */}
      <aside className="font-dm-sans hidden sticky top-0 left-0 h-screen justify-between   md:flex md:flex-col md:w-64  ">
        <div className="ml-6 mt-3 mb-4 ">
          <NavLink to="/" className="text-2xl   cursor-pointer">
            <img src={Logo} alt="logo" className="w-[100px] md:w-[150px]" />
          </NavLink>
        </div>

        {/* MAIN TAB */}
        <div className="pl-4 w-full text-sm  pb-5 bg-[#f5f5f5]">
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
          <div className="mt-10 pl-3 ">
            <div className="flex items-center gap-3">
              <img src={Image} alt="" className="w-10" />
              <div className="flex flex-col gap-0.5">
                <div className="font-semibold text-sm">John Caleb Ekong</div>
                <div className="text-sm font-medium text-[#999999]">Buyer</div>
=======
  {
    /* Sidebar */
  }

  return (
    <>
      {" "}
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-gray-100 p-6 flex-col justify-between z-50 transform transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0 flex"
            : "-translate-x-full md:translate-x-0 md:flex"
        }`}
      >
        {/* Close button (only on mobile) */}
        <button
          className="md:hidden mb-6 p-2 border rounded-lg self-end"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>
        <div>
          <div className="mb-6 flex items-center gap-2">
            <div className="w-9 h-9 rounded-md flex items-center justify-center shadow-sm">
              <img src={Logo} alt="" />
            </div>
            <div className="text-sm font-semibold">FarmMarket</div>
          </div>

          <nav className="text-sm text-gray-500">
            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-400 mb-2">
                Main
>>>>>>> 80c4558e1e8041c1f3b2f7b7fb5029198e2a0954
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <span>🏠</span>
                  <span>Dashboard</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <img src={Group} alt="" />
                  <span>Upload produce</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-400 mb-2">
                Transaction
              </div>
              <ul className="space-y-1">
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  <img src={Monitor} alt="" /> Order Management
                </li>
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  📨 Buyers Request
                </li>
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  <Send className="text-black size-4" /> Deliveries
                </li>
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  <img src={Track} alt="" className="w-5 h-5" /> Track Order
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mb-4">
          <img src={Wallet} alt="" className="w-4 h-4" />
          payment
        </div>

        <nav>
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-400 mb-2">Main</div>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-gray-700 font-medium">
                <CircleQuestionMark color="#000000" className="w-4 h-4" />
                <span>system</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <img src={Support} alt="" className="w-4 h-4" />
                <span>support</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Settings color="#000000" className="w-4 h-4" />
                <span>setting</span>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-24">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="me"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="text-sm font-semibold">John Caleb Ekong</div>
              <div className="text-xs text-gray-400">Farmer</div>
            </div>
          </div>

          <div className="flex gap-2 mt-6 text-sm text-red-500">
            <span>
              <LogOut color="#000000" className=" " />
            </span>
            <span>Logout</span>
          </div>
        </div>
      </aside>
<<<<<<< HEAD

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
                  <img src={Image} alt="" className="w-10" />
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
=======
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Mobile Navbar Toggle */}
        <button
          className="md:hidden mb-4 p-2 border rounded-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      </main>
>>>>>>> 80c4558e1e8041c1f3b2f7b7fb5029198e2a0954
    </>
  );
}
