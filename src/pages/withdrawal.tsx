import Logo2 from "assets/Home-images/Logo 2.svg"

const withdrawal = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start p-5 font-sans">
      <header className="bg-lime-500 w-full max-w-xl flex justify-between items-center px-5 py-2.5 text-white font-bold">
        <div className="flex items-center">
          <div className="bg-yellow-400 rounded-full w-[30px] h-[30px] flex justify-center items-center mr-2.5">
            <img src="Logo2" alt="basket icon" /> {/* Placeholder for basket icon */}
          </div>
        </div>
        <div className="flex items-center">
          Q ❄ {/* Placeholder for icons */}
          <span className="mx-2.5">John Caleb Elong</span>
          <div className="bg-gray-500 rounded-full w-[30px] h-[30px]" /> {/* Placeholder for avatar */}
          <span className="ml-1.25">Farmer</span>
        </div>
      </header>
      <div className="bg-white w-full max-w-xl p-5 rounded-lg shadow mt-5">
        <div className="flex items-center mb-5">
          <div className="bg-lime-500 rounded-full w-[30px] h-[30px] flex justify-center items-center text-white text-xl mr-2.5">
            ←
          </div>
          <h2 className="m-0">Withdrawal</h2>
        </div>
        <form className="flex flex-col">
          <label className="mb-1.25 font-bold">Amount:</label>
          <input
            type="text"
            defaultValue="4500"
            className="mb-[15px] p-2.5 border border-gray-300 rounded"
          />
          <label className="mb-1.25 font-bold">From:</label>
          <input
            type="text"
            defaultValue="Escrow Wallet"
            className="mb-[15px] p-2.5 border border-gray-300 rounded"
          />
          <label className="mb-1.25 font-bold">To:</label>
          <input
            type="text"
            defaultValue="GT 1023520421"
            className="mb-5 p-2.5 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-lime-500 text-white p-2.5 border-none rounded font-bold cursor-pointer"
          >
            Confirm Withdrawal
          </button>
        </form>
      </div>
    </div>

  );
};

export default withdrawal;