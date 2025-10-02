import { useState } from "react";

function VerificationDetailsInput() {
  const [idFile, setIdFile] = useState<File | null>(null);
  const [cacFile, setCacFile] = useState<File | null>(null);
  const [formInputError, setFormInputError] = useState<string | null>(null);

  const handleIdFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIdFile(e.target.files[0]);
    }
  };

  const handleCacFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCacFile(e.target.files[0]);
    }
  };

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idFile || !cacFile) {
      showError("Please upload both files before submitting.");
      return;
    }
   
    // Handle actual upload here
  };

  const showError = (message: string) => {
    setFormInputError(message); 
    setTimeout(() => setFormInputError(null), 5000); // Clear after 5 seconds
    };

  return (
    <>
      <div className="mt-8 md:mt-0 mb-4 text-[#20B658] text-[20px] font-bold md:text-[32px]">
        Verification of Details
      </div>

      <form onSubmit={handleFileSubmit} className="py-5 flex flex-col gap-10">
        {/* Government ID */}
        <div className="flex flex-col gap-2">
          <label htmlFor="idFile">
            Government-issued ID (e.g., National ID, Driver's License)
          </label>
          <input
            id="idFile"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleIdFileChange}
            className="text-sm border cursor-pointer border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 w-full
                       file:bg-gray-200 file:border-0 file:rounded-md file:px-3 file:py-2 file:text-sm file:font-light file:text-gray-700 hover:file:bg-gray-400 file:cursor-pointer"
          />
          {idFile && (
            <span className="text-sm text-green-600 mt-1">Selected: {idFile.name}</span>
          )}
        </div>

        {/* CAC Registration */}
        <div className="flex flex-col gap-2">
          <label htmlFor="cacFile">
            CAC Business Registration (for large-scale/commercial farmers)
          </label>
          <input
            id="cacFile"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleCacFileChange}
            className="text-sm cursor-pointer border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 w-full
                       file:bg-gray-200 file:border-0 file:rounded-md file:px-3 file:py-2 file:text-sm file:font-light file:text-gray-700 hover:file:bg-gray-400 file:cursor-pointer"
          />
          {cacFile && (
            <span className="text-sm text-green-600 mt-1">Selected: {cacFile.name}</span>
          )}
        </div>
        {formInputError && (
          <div className="text-red-600 text-sm mt-2">{formInputError}</div>
        )}

        <button
          type="submit"
          className="text-[#20B658] border border-[#20B658] md:w-[300px] md:mx-auto py-2 rounded-md hover:text-white hover:bg-[#20B658] transition-colors mt-4 cursor-pointer"
        >
          Continue
        </button>
      </form>
    </>
  );
}

export default VerificationDetailsInput;