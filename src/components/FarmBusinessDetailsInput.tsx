import { useState } from "react";

type BDAuth = {
  businessName: string;
  businessLocation: string;
  scaleBusiness: string;
  typeProduce: string;
};

function BusinessDetails() {
  const [formData, setFormData] = useState<BDAuth>({
    businessName: "",
    businessLocation: "",
    scaleBusiness: "",
    typeProduce: "",
  });

  const [showErr, setShowErr] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.businessLocation || !formData.scaleBusiness || !formData.typeProduce) {
    showInputErr("Please fill in all fields before continuing.");
    return;
  }

  // If valid, do something (API, console, etc)
  console.log("Form submitted:", formData);

  };

    function showInputErr(message: string) { 
    setShowErr(message);
    return;
    }

  return (
    <div className="mt-8 md:mt-0 md:pt-0 flex flex-col h-full">
      <h1 className=" text-green-btn font-bold pb-2 mb-5 text-[20px] md:text-[32px]">Farm/Business Details</h1>


      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Business Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="businessName" className="font-medium">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            placeholder="Enter Business Name"
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500"
            value={formData.businessName}
            onChange={handleChange}
          />
        </div>

        {/* Business Location */}
        <div className="flex flex-col gap-1">
          <label htmlFor="businessLocation" className="font-medium">
            Farm/Business Location
          </label>
          <input
            type="text"
            name="businessLocation"
            placeholder="Enter Farm/Business Location"
            onChange={handleChange}
            value={formData.businessLocation}
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Scale of Business */}
        <div className="flex flex-col gap-1">
          <label htmlFor="scaleBusiness" className="font-medium">
            Scale of Business
          </label>
          <select
            id="scaleBusiness"
            name="scaleBusiness"
            value={formData.scaleBusiness}
            onChange={handleChange}
            className="w-full text-gray-500 border border-gray-300 rounded-md px-2 py-1 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Scale Of Business</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Type of Produce */}
        <div className="flex flex-col gap-1">
          <label htmlFor="typeProduce" className="font-medium">
            Type of Produce
          </label>
          <select
            id="typeProduce"
            name="typeProduce"
            value={formData.typeProduce}
            onChange={handleChange}
            className="w-full text-gray-500 border border-gray-300 rounded-md px-2 py-1 focus:outline-none cursor-pointer focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Type of Produce</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
          </select>
        </div>

        {showErr && (
          <p className="text-red-500 text-sm text-center">{showErr}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-btn text-white  border-0 md:w-[300px] md:mx-auto py-2 rounded-md hover:text-white hover:bg-green-dark transition-colors mt-4 cursor-pointer"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default BusinessDetails;
