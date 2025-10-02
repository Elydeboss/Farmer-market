import { useState } from "react";
import { NavLink } from "react-router-dom";
import MarketplaceSidebar from "../components/dashboard-components/MarketplaceSidebar";
import Logo from "../assets/Logo-black.svg";

import { Menu, ShoppingCartIcon } from "lucide-react";
import ProductGrid from "../components/dashboard-components/ProductGrid";

const Marketplace = () => {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  /* MESSAGE APPEARS FOR TWO SECONDS */

  function handleBuy(productId: number) {
    setCartCount((c) => c + 1);
  }

  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR */}
      <MarketplaceSidebar open={open} onClose={() => setOpen(false)} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex-col  ">
        {/* MOBILE TOP BAR WITH HAMBURGER */}
        <div className="md:hidden flex items-center z-20 p-5 justify-between ">
          <NavLink to="/" className="text-2xl  cursor-pointer">
            <img src={Logo} alt="logo" className="w-[150px]" />
          </NavLink>
          <div className="flex items-center gap-3">
            <NavLink to="/cartpage">
              <div className="relative ">
                <button aria-label="Open cart">
                  <ShoppingCartIcon className="w-6 h-6 font-bold" />
                </button>

                {/* CART BUNBER */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-medium rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>
            <div className="">
              <button onClick={() => setOpen(true)}>
                <Menu className="w-7 h-7 font-bold" />
              </button>
            </div>
          </div>
        </div>

        {/* OUTLET FOR NESTED ROUTES */}
        <div className=" md:py-4 max-w-7xl mx-auto w-full ">
          {/* HEADER */}
          <header className="hidden md:flex items-center justify-between px-6  w-full md:w-[95%] pb-3 border-b-2 border-[#e6e6e6]">
            <div className="">
              <h2 className="text-black font-bold text-2xl">Marketplace</h2>
            </div>

            <div className="">
              <NavLink to="/cartpage">
                <div className="relative ">
                  <button aria-label="Open cart">
                    <ShoppingCartIcon className="w-6 h-6 font-bold" />
                  </button>

                  {/* CART BUNBER */}
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-medium rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </NavLink>
            </div>
          </header>

          {/* MAIN CONTENT */}
          <ProductGrid onBuy={handleBuy} />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
