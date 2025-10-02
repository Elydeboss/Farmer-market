import { useState } from "react"
import {Link } from "react-router-dom"

type check = {
  email: string;
  password: string;
};

const SingInput = () => {
  const [formData, setFormData] = useState<check>({
    email: "",
    password: "",   
  });

  const [isSignUp, setIsSignUp] = useState(false);
  const [formInputError, setFormInputError ] = useState<string | null>(null);
   const [success, setSuccess] = useState<string | null>(null); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const showError = (message: string) => {
    setFormInputError(message);
    setTimeout(() => setFormInputError(null), 5000); // Clear after 5 seconds
  }
    const showSuccess = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 5000); // Clear after 5 seconds
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Check required fields manually 
  if (
    !formData.email ||
    !formData.password 
  ) {
    showError("All fields are required!");
    return;
  }
  // If valid, do something (API, console, etc)
  console.log("Form submitted:", formData);
    showSuccess("Signed in successfully!");
    setFormData({
      email: "",
      password: "",     
    });
  }


  
  return (
    <div className="mt-8 md:mt-0 md:pt-0  flex flex-col h-full">
      <h1 className="text-green-600 font-bold pb-2 mb-5 text-[20px] md:text-[32px]">
        Sign In to your Account
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email Address */ }
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
            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500 text-[14px]"
          />
        </div>
        {/* Password */ }
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
            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500 text-[14px]"
          />
        </div>

        {formInputError && (
          <div className="text-red-600 text-sm mt-1">{formInputError}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm mt-1">{success}</div>
        )}

         <div className="flex items-center flex-row gap-3 pt-3">
          <button
            type="submit"
            className="text-[#20B658] cursor-pointer font-medium px-8 py-1.5 rounded-md border-2 border-green-600 hover:bg-[#20B658] hover:text-white transition duration-300"
          >
            Sign In
          </button>

          <Link to="/createaccount">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className=" text-[#20B658] cursor-pointer font-medium px-8 py-1.5 rounded-md border-2 border-green-600 hover:bg-[#20B658] hover:text-white transition duration-300"
          >
            Sign Up
           
          </button>
           </Link>

        </div>
      </form> 
    </div>
  )
}

export default SingInput
