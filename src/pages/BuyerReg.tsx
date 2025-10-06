import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/woman-farm.png";
import logo from "../assets/Logo 2.png";
import backIcon from "../assets/arrow-icon.svg";
import { useFarmerContext } from "../context/FarmerContext";


const BuyerReg: React.FC = () => {

   const {setPhone} = useFarmerContext()


   const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    lga: "",
    businessName: "",
    businessType: "",
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
 
  
 
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // clear field-specific error when user types
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!/^\d{10,15}$/.test(form.phoneNumber))
      errors.phoneNumber = "Enter a valid phone number (10-15 digits)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email address";
    if (form.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!form.state) errors.state = "Please select your state";
    if (!form.lga) errors.lga = "Please select your LGA";
    if (!form.agreeToTerms)
      errors.agreeToTerms = "You must agree to the Terms of Use";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      throw new Error("Please fix the highlighted errors");
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      validateForm();

      //Send correct data keys for backend
      const payload = {
        fullName: form.fullName,
        phoneNumber: form.phoneNumber,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        agreeToTerms: form.agreeToTerms,
      };

      const res = await axios.post(
        "http://localhost:3500/api/users/register/buyer",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(res.data.message || "Account created successfully 🎉");
       setTimeout(() => {
        navigate("/verificationcode");
      }, 1500);

      setPhone(form.phoneNumber)


    
     
    } catch (error: any) {
      console.error("Registration Error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          setMessage(error.response.data?.message || "Server error occurred");
        } else if (error.request) {
          setMessage("No response from server. Please check your connection.");
        } else {
          setMessage("Error setting up request. Please try again.");
        }
      } else if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Unexpected error. Please try again.");
      }

      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light font-dm-sans min-h-screen w-full flex flex-col md:grid md:grid-cols-[1fr_1.4fr] max-w-6xl mx-auto overflow-hidden">
      {/* Left Section */}
      <div
        className="relative h-60 md:h-auto bg-cover bg-center p-6 text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <img
          src={logo}
          alt="FarmMarket Logo"
          className="w-40 sm:w-32 md:w-36 object-contain mt-2"
        />
        <div className="mt-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Hello, Welcome!
          </h1>
          <p className="text-sm md:text-base font-light">
            Please create your verified buyer account to continue.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center px-6 sm:px-10 py-10 md:py-0 bg-white md:rounded-r-2xl">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="relative flex items-center mb-6">
            <Link to="/signuphome">
              <img
                src={backIcon}
                alt="Back"
                className="w-6 absolute -left-8 md:-left-10 top-1 hover:opacity-50 transition"
              />
            </Link>
            <h2 className="text-green-btn text-xl sm:text-2xl font-bold ml-4 md:ml-6">
              Create Buyer Account
            </h2>
          </div>

          {/* Form */}
         <form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
>
  {[
    { label: "Full Name", name: "fullName", type: "text", span: 2, placeholder: "Enter your full name" },
    { label: "Phone Number", name: "phoneNumber", type: "tel", placeholder: "Enter your phone number" },
    { label: "Email", name: "email", type: "email", placeholder: "Enter your email address" },
    { label: "Password", name: "password", type: "password", span: 2, placeholder: "Create a password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password", span: 2, placeholder: "Re-enter your password" },
  ].map(({ label, name, type, span, placeholder }) => (
    <div key={name} className={span === 2 ? "sm:col-span-2" : ""}>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={(form as any)[name]}
        onChange={handleChange}
        required
        placeholder={placeholder}
        className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 ${
          fieldErrors[name]
            ? "border-red-500 focus:ring-red-400"
            : "focus:ring-green-btn"
        } transition text-sm`}
      />
      {fieldErrors[name] && (
        <p className="text-red-500 text-xs mt-1">{fieldErrors[name]}</p>
      )}
    </div>
  ))}

  {/* State */}
  <div>
    <label className="block text-sm font-medium">State</label>
    <select
      name="state"
      value={form.state}
      onChange={handleChange}
      required
      className={`w-full mt-1 p-2 border rounded-md text-gray-600 text-sm focus:outline-none focus:ring-2 ${
        fieldErrors.state
          ? "border-red-500 focus:ring-red-400"
          : "focus:ring-green-btn"
      }`}
    >
      <option value="">Select State</option>
      <option value="lagos">Lagos</option>
      <option value="abuja">Abuja</option>
    </select>
    {fieldErrors.state && (
      <p className="text-red-500 text-xs mt-1">{fieldErrors.state}</p>
    )}
  </div>

  {/* LGA */}
  <div>
    <label className="block text-sm font-medium">LGA</label>
    <select
      name="lga"
      value={form.lga}
      onChange={handleChange}
      required
      className={`w-full mt-1 p-2 border rounded-md text-gray-600 text-sm focus:outline-none focus:ring-2 ${
        fieldErrors.lga
          ? "border-red-500 focus:ring-red-400"
          : "focus:ring-green-btn"
      }`}
    >
      <option value="">Select LGA</option>
      <option value="ikeja">Ikeja</option>
      <option value="garki">Garki</option>
    </select>
    {fieldErrors.lga && (
      <p className="text-red-500 text-xs mt-1">{fieldErrors.lga}</p>
    )}
  </div>

  {/* Optional Fields */}
  <div>
    <label className="block text-[16px] font-medium">
      Business Name <span className="text-gray-400">(optional)</span>
    </label>
    <input
      type="text"
      name="businessName"
      value={form.businessName}
      onChange={handleChange}
      placeholder="Enter your business name"
      className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-btn text-sm"
    />
  </div>

  <div>
    <label className="block text-sm font-medium">
      Business Type <span className="text-gray-400">(optional)</span>
    </label>
    <input
      type="text"
      name="businessType"
      value={form.businessType}
      onChange={handleChange}
      placeholder="Enter your business type"
      className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-btn text-sm"
    />
  </div>


            {/* Terms */}
            <div className="sm:col-span-2 flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={form.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded focus:ring-green-btn"
              />
              <label className="text-sm text-gray-700">
                I agree to the{" "}
                <Link to="/terms" className="text-green-btn underline">
                  Terms of Use
                </Link>
              </label>
            </div>
            {fieldErrors.agreeToTerms && (
              <p className="text-red-500 text-xs sm:col-span-2">
                {fieldErrors.agreeToTerms}
              </p>
            )}

            {/* Submit */}
            <div className="sm:col-span-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-md font-medium text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-btn hover:bg-green-dark"
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            {/* Feedback Message */}
            {message && (
              <p
                className={`sm:col-span-2 text-center text-sm mt-3 ${
                  isError ? "text-red-600" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyerReg;
