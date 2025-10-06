import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import backIcon from "../assets/arrow-icon.svg";

type AuthenticateForm = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

function CreateAccountInputField() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AuthenticateForm>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [formInputError, setFormInputError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormInputError(null);
    setSuccess(null);

    // 🔒 Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return showError("All fields are required!");
    }

    if (!formData.agreeToTerms) {
      return showError("You must accept the Terms of Use!");
    }

    if (formData.password !== formData.confirmPassword) {
      return showError("Passwords do not match!");
    }

    if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      return showError("Phone number must be 10–15 digits.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return showError("Please enter a valid email address.");
    }

    // ✅ Send data to API
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3500/api/users/register/farmer",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          agreeToTerms: formData.agreeToTerms,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      showSuccess(response.data?.message || "Account created successfully 🎉");

      // ✅ Reset form
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });

    
      setTimeout(() => {
        navigate("/businessdetails");
      }, 1500);
    } catch (error: any) {
      console.error("Registration Error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          showError(error.response.data?.message || "Server error occurred");
        } else if (error.request) {
          showError("No response from server. Please check your connection.");
        } else {
          showError("Error setting up the request.");
        }
      } else {
        showError("Unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const showError = (message: string) => {
    setFormInputError(message);
    setTimeout(() => setFormInputError(null), 5000);
  };

  const showSuccess = (message: string) => {
    setSuccess(message);
    setFormInputError(null);
    setTimeout(() => setSuccess(null), 5000);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="relative flex items-center mb-6">
        <Link to="/signuphome">
          <img
            src={backIcon}
            alt="Back"
            className="w-6 absolute -left-8 md:-left-10 top-1 hover:opacity-50 transition"
          />
        </Link>
        <h1 className="text-green-btn font-bold text-lg sm:text-xl ml-4 md:ml-6">
          Create Account
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
        {[
          { name: "firstName", label: "First Name", type: "text" },
          { name: "lastName", label: "Last Name", type: "text" },
          { name: "phoneNumber", label: "Phone Number", type: "tel" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "password", label: "Password", type: "password", span:2 },
          { name: "confirmPassword", label: "Confirm Password", type: "password" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <label htmlFor={field.name} className="font-medium">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={`Enter ${field.label}`}
              value={(formData as any)[field.name]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
        ))}

        {/* Terms */}
        <div className="flex items-center gap-2 mt-2 text-sm">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="accent-green-600 w-4 h-4"
          />
          <span>
            I agree to the{" "}
            <span className="text-green-600 cursor-pointer hover:underline">
              Terms of Use
            </span>
          </span>
        </div>

        {/* Feedback */}
        {formInputError && (
          <div className="text-red-500 text-sm bg-red-100 border border-red-300 px-2 py-1 rounded">
            {formInputError}
          </div>
        )}

        {success && (
          <div className="text-green-600 text-sm bg-green-100 border border-green-300 px-2 py-1 rounded">
            {success}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#20B658] hover:bg-green-700"
            } text-white font-medium text-sm px-5 py-2 rounded-md transition duration-300`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <Link to="/signin">
            <button
              type="button"
              className="bg-[#20B658] text-white font-medium text-sm px-5 py-2 rounded-md hover:bg-green-700 transition duration-300"
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
