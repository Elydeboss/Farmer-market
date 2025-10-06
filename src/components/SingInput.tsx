import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/arrow-icon.svg";

type AuthCredentials = {
  email: string;
  password: string;
};

const SignInput = () => {
  const [formData, setFormData] = useState<AuthCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // show timed error
  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  // show timed success
  const showSuccess = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 5000);
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await axios.post(
        "http://localhost:3500/api/users/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;

      // Save token
      localStorage.setItem("token", data.token);

      showSuccess("Signed in successfully!");
      console.log("User logged in:", data);

      // Navigate to dashboard
      navigate("/buyerdashboard");

      // Reset form
      setFormData({ email: "", password: "" });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        showError(err.response.data.message || "Login failed");
      } else {
        showError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 md:mt-0 flex flex-col h-full">
      {/* Header */}
      <div className="relative mb-6">
        <Link to="/">
          <img
            src={logo}
            className="w-6 absolute -left-8 md:-left-10 top-0.5 hover:opacity-50"
            alt="Back"
          />
        </Link>
        <h1 className="text-green-btn font-bold text-md sm:text-lg">
          Sign In to your Account
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Feedback messages */}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}

        {/* Buttons */}
        <div className="flex flex-row gap-3 pt-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-btn text-white font-medium text-xs px-6 md:px-8 py-2 rounded-md hover:bg-green-dark transition duration-300 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <Link to="/signuphome">
            <button
              type="button"
              className="bg-green-btn text-white font-medium text-xs px-6 md:px-8 py-2 rounded-md hover:bg-green-dark transition duration-300"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInput;
