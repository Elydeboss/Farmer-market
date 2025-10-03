import { useState, useRef } from "react";
import logo from "../assets/Asset 2.png";

const VerificationCode = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if filled
      if (value && index < code.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = code.join("");
    if (finalCode.length === 6) {
      console.log("Code submitted: " + finalCode);
    } else {
      console.log("Please enter all 6 digits.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md text-center">

        <div className="flex justify-center mb-6">
            <img src={logo}
            className="h-10 md:h-14 object-contain" />
        </div>

        
        <h1 className="text-2xl md:text-3xl font-bold text-green-btn mb-2">
          Enter Verification Code
        </h1>
        <p className="text-gray-600 mb-6">
          A 6-digit code has been sent via SMS to{" "}
          <span className="font-medium">+234 80406020150</span>
        </p>

        
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
          <div className="flex gap-3 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              />
            ))}
          </div>

          
          <p className="text-gray-600 text-sm">
            Didn't get a code?{" "}
            <button
              type="button"
              onClick={() => console.log("Code resent")}
              className="text-green-600 font-medium hover:underline"
            >
              Click to resend
            </button>
          </p>

        
          <div className="flex gap-4 mt-4 w-full justify-center">
            <button
              type="button"
              onClick={() => console.log("Cancelled")}
              className="text-black border-2 border-green-btn font-medium px-10 py-1   rounded-md hover:bg-green-btn hover:text-white shadow"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-black border-2 border-green-btn font-medium px-10 py-1   rounded-md hover:bg-green-btn hover:text-white shadow"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode;
