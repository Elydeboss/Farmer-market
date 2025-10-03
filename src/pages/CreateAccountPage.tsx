import africanFarmerImage from "../assets/photorealistic-view-african-people-harvesting-vegetables-grains 1.jpg";
import logo from "../assets/Logo 2.png";
import CreateAccountInputField from "../components/CreateAccountInputField";

function CreateAccountPage() {
  return (
    <div className=" bg-light  font-dm-sans grid justify-center  h-full w-full md:grid-cols-[repeat(2,1fr)] gap-3 md:gap-10   pr-20 max-w-7xl mx-auto ">
      <div
        className="relative bg-cover bg-center bg-no-repeat h-screen w-full object-cover hidden md:block"
        style={{ backgroundImage: `url(${africanFarmerImage})` }}
      >
        <img
          src={logo}
          className="absolute mt-5  w-30 md:w-50  md:mt-10 h-10  pl-5   object-contain"
          alt="logo"
        />
      </div>

      <div className="mt-5 md:mt-10 md:mr-20 max-w-lg ">
        <CreateAccountInputField />
      </div>
    </div>
  );
}

export default CreateAccountPage;
