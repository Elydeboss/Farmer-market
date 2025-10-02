import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Define the structure of form values
interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  state: string;
  lga: string;
  businessName: string;
  businessType: string;
  agreeTerms: boolean;
  consent: boolean;
}

// Define errors type as a key-value object
interface FormErrors {
  [key: string]: string;
}

export default function CreateAccount() {
  // State for form values
  const [form, setForm] = useState<FormValues>({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    lga: "",
    businessName: "",
    businessType: "",
    agreeTerms: false,
    consent: false,
  });

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // State for validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  /**
   * Handle input changes and update form state safely
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    //const { name, value, type, checked } = e.currentTarget;
    //setForm((prevForm) => ({
    //...prevForm,
    //[name]: type === "checkbox" ? checked : value,
    // }));
  };

  /**
   * Validate form inputs and return error messages
   */
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!/^\+?[0-9]{10,15}$/.test(form.phone))
      newErrors.phone = "Invalid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
    return newErrors;
  };

  /**
   * Handle form submission with validation
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    alert("Account created successfully 🚀");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4"
      >
        <h2 className="text-center text-2xl font-bold text-green-600">
          Create Account
        </h2>

        {/* Full Name */}
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="+234"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 pr-10 focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 pr-10 focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-2 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* State and LGA */}
        <div className="flex gap-2">
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select State</option>
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
          </select>
          <select
            name="lga"
            value={form.lga}
            onChange={handleChange}
            className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select LGA</option>
            <option value="ikeja">Ikeja</option>
            <option value="garki">Garki</option>
          </select>
        </div>

        {/* Business Info */}
        <div className="flex gap-2">
          <input
            type="text"
            name="businessName"
            placeholder="Business Name (optional)"
            value={form.businessName}
            onChange={handleChange}
            className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="businessType"
            placeholder="Business Type (optional)"
            value={form.businessType}
            onChange={handleChange}
            className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={form.agreeTerms}
              onChange={handleChange}
              className="accent-green-600"
            />
            I agree to FarmMarket's Terms & Conditions and Privacy Policy
          </label>
          {errors.agreeTerms && (
            <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
          )}

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="accent-green-600"
            />
            I consent to FarmMarket verifying my details for platform safety
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
