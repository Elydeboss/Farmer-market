import bgImage from "../assets/woman-harvesting-vegetable 1.jpg";
import logo from "../assets/Logo 2.png";

const BuyerReg: React.FC = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-[1fr_2fr] h-screen font-dm-sans py-7 px-4 sm:px-10   md:px-auto gap-6 md:gap-0 bg-light justify-center">
      {/* Left Section */}
      <div
        className="relative px-6 py-1 md:p-6 sm:p-5 bg-cover  bg-center h-20 md:h-full rounded-lg flex flex-col justify-start max-w-md"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Logo */}
        <img src={logo} alt="FarmMarket Logo" className="w-25 sm:w-35 md:w-50 mt-2 md:mt-0" />

        {/* Welcome text */}
        <div className="text-white  max-w-xs md:max-w-md ">
          <h1 className="text-sm sm:text-[16px] font-bold md:mb-1">Hello, Welcome!</h1>
          <p className="text-sm sm:text-base">
            Please create your verified account.
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className=" flex items-center justify-start h-full bg-tet pt-3 pl-10 pr-5">
        <div className="w-full max-w-md">
          <h2 className="text-green-600 text-xl sm:text-2xl font-semibold mb-4">
            Create Account
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="tel"
                placeholder="+234"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="min. 6 characters"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium">State</label>
              <select className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Select State</option>
              </select>
            </div>

            {/* LGA */}
            <div>
              <label className="block text-sm font-medium">LGA</label>
              <select className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Select LGA</option>
              </select>
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium">
                Business Name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-sm font-medium">
                Business Type <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Checkboxes */}
            <div className="sm:col-span-2 space-y-2 text-xs">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                I agree to FarmMarket''s Terms & Conditions and Privacy Policy
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                I consent to FarmMarket verifying my details for platform safety
              </label>
            </div>

            {/* Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-btn text-white py-2 rounded-md hover:bg-green-dark transition"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyerReg;
