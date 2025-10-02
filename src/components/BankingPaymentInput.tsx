import { useState } from "react";

type FormData = {
  bankName: string;
  accountNumber: string;
  accountName: string;
};

const BankingPaymentInput = () => {
  const [formData, setFormData] = useState<FormData>({
    bankName: "",
    accountNumber: "",
    accountName: "",
  });
  const [showErr, setShowErr] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Only allow digits for account number
    if (name === "accountNumber" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showError = (message: string) => {
    setShowErr(message);
    setTimeout(() => setShowErr(null), 5000); // Clear after 5 seconds
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation rules
    if (!formData.bankName) {
      showError("Please select a bank.");
      return;
    }
    if (!formData.accountName.trim()) {
      showError("Please enter your account name.");
      return;
    }
    if (!formData.accountNumber) {
      showError("Please enter your account number.");
      return;
    }
    if (formData.accountNumber.length !== 10) {
      showError("Account number must be 10 digits.");
      return;
    }

    // Passed validation ✅
    console.log("Form submitted:", formData);
  };

  return (
    <div className="mt-8 md:mt-0 md:pt-0  flex flex-col h-full">
      <h1 className="text-[:#20B658] font-bold pb-2 mb-5 text-[20px] md:text-[32px]">
        Banking/Payment Details
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Bank Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="bankName" className="font-medium">
            Bank Name
          </label>
          <select
            id="bankName"
            name="bankName"
            value={formData.bankName}
            className="w-full  text-gray-500 border border-gray-300 rounded-md px-2 py-2 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500 text-[14px]"
            onChange={handleChange}
          >
            <option value="">Select Bank Name</option>
            <option value="Access Bank">Access Bank</option>
            <option value="First Bank">First Bank</option>
            <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
            <option value="Zenith Bank">Zenith Bank</option>
            <option value="Wema Bank">Wema Bank</option>
          </select>
        </div>

        {/* Account Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="accountName" className="font-medium">
            Account Name
          </label>
          <input
            id="accountName"
            type="text"
            name="accountName"
            placeholder="Enter Account Name"
            value={formData.accountName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500 text-[14px]"
          />
        </div>

        {/* Account Number */}
        <div className="flex flex-col gap-1">
          <label htmlFor="accountNumber" className="font-medium">
            Account Number
          </label>
          <input
            id="accountNumber"
            type="text"
            name="accountNumber"
            placeholder="Enter 10-digit Account Number"
            value={formData.accountNumber}
            maxLength={10}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500 text-[14px]"
          />
        </div>

        {/* Error message */}
        {showErr && <div className="text-red-600 text-sm mt-2">{showErr}</div>}

        {/* Submit button */}
        <button
          type="submit"
          className="text-white border border-[#20B658] md:w-[300px] mt-5 md:mx-auto py-2 rounded-md bg-[#20B658] hover:bg-green-dark  transition-colors cursor-pointer"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default BankingPaymentInput;
