import bgImage from "../assets/Rectangle 28.jpg"
import logo from "../assets/Logo 2.png";
import BusinessDetails from "../components/FarmBusinessDetailsInput";

function FarmBusinessDetails() {
  return (
    <div className=" bg-light font-dm-sans grid justify-center  h-full w-full md:grid-cols-[repeat(2,1fr)] gap-3 md:gap-10  max-w-7xl mx-auto  ">
      
        <div 
        className=" relative bg-cover bg-no-repeat h-screen w-full object-cover hidden md:block" 
        style={{backgroundImage: `url(${bgImage})`}}>
         <img src={logo} 
         className="absolute mt-5  w-30 md:w-50  md:mt-10 h-10  pl-5   object-contain" 
         alt="logo" />
        </div>

        <div className="mt-5 md:mt-10 md:mr-20 max-w-lg">

        < BusinessDetails />
        </div>
    </div>

  
  )
}

export default FarmBusinessDetails
