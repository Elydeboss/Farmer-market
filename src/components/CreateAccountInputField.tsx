import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type AuthenticateForm = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

function CreateAccountInputField() {
  const [formData, setFormData] = useState<AuthenticateForm>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [isSignUp, setIsSignUp] = useState(false);
  const [formInputError, setFormInputError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // ✅ checkbox fix
    }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const navigate = useNavigate();
    // Check required fields manually
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.terms
    ) {
      showError("All fields are required and Terms must be accepted!");
      return;
    }

    // Extra validation
    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match!");
      return;
    }

    showSuccess("Account created successfully!");

    navigate("/dashboard");

    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    });
  }

  const showError = (message: string) => {
    setFormInputError(message);
    setTimeout(() => setFormInputError(null), 5000); // Clear after 5 seconds
  };

  const showSuccess = (message: string) => {
    setSuccess(message);
    setFormInputError(null); // clear error if showing success
    setTimeout(() => setSuccess(null), 5000); // Clear after 5 seconds
  };

  return (
    <div className="mt-8 md:mt-0 md:pt-3 flex flex-col h-full">
      <h1 className="  text-[#20B658] font-bold pb-2 mb-5 text-[16px] sm:text-[20px] md:text-[32px]">
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-1 text-[12px] md:text-[14px] "
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="firstName" className="font-medium">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none text-[12px] sm:text-[14px]  cursor-pointer focus:ring-2 focus:ring-green-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="lastName" className="font-medium">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none text-[12px] sm:text-[14px]  cursor-pointer focus:ring-2 focus:ring-green-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phoneNumber" className="font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none text-[12px] sm:text-[14px]  cursor-pointer focus:ring-2 focus:ring-green-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none text-[12px] sm:text-[14px]  cursor-pointer focus:ring-2 focus:ring-green-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none text-[12px] sm:text-[14px] cursor-pointer focus:ring-2 focus:ring-green-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none text-[12px] sm:text-[14px]  cursor-pointer focus:ring-2 focus:ring-green-2"
          />
        </div>

        <div className="flex flex-row gap-1 items-center mt-2 text-[12px] sm:text-[14px] ">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <span>
            I Agree To The <span className="text-green-2">Terms Of User</span>
          </span>
        </div>

        {formInputError && (
          <div className="text-red-500 text-sm">{formInputError}</div>
        )}

        {success && (
          <div className="text-green-600 text-sm bg-green-100 border border-green-300 px-2 py-1 rounded">
            {success}
          </div>
        )}

        <div className="flex items-center flex-row gap-3 pt-3">
          <button
            type="submit"
            className=" text-[#20B658] cursor-pointer font-medium px-8 py-1.5 rounded-md border-2 border-green-600 hover:bg-[#20B658] hover:text-white transition duration-300"
          >
            Sign Up
          </button>

          <Link to="/signin">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className=" text-[#20B658] cursor-pointer font-medium px-8 py-1.5 rounded-md border-2 border-green-600 hover:bg-[#20B658] hover:text-white transition duration-300"
            >
              Sign In
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateAccountInputField;
