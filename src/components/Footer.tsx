import { PhoneCall, Instagram, Facebook, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-pri w-full">
      <div className="max-w-[1100px] mx-auto py-15 px-5 flex justify-between gap-10 md:flex-row flex-col">
        <div className="w-full md:w-1/3">
          <h4 className="text-white mb-4 font-semibold text-xl">Contact Us</h4>
          <p className="text-light text-sm flex gap-3 items-center">
            {/* Phone Icon */}
            <PhoneCall /> 08123377800
          </p>
        </div>
        <ul className="list-none w-full md:w-1/3 space-y-4">
          <li className="text-light text-sm flex gap-4 items-center">
            <a href="">
              {/* Instargram Icon */}
              <Instagram />
              @FarmMarket
            </a>
          </li>
          <li className="text-light text-sm flex gap-4 items-center">
            <a href="">
              {/* X Icon */}
              <i className="fab fa-twitter-f"></i>
              @FarmMarketNg
            </a>
          </li>
          <li className="text-light text-sm flex gap-4 items-center">
            <a href="">
              {/* Facebook Icon */}
              <Facebook />
              Farm Market Nigeria
            </a>
          </li>
        </ul>
        <div className="w-full md:w-1/3">
          <h4 className="text-white mb-4 text-xl font-semibold">Address</h4>
          <p className="text-light text-sm flex gap-4 items-center">
            {/* Marker Icon */}
            <MapPin className="h-4 w-4" />
            Lorem ipsum dolor sit amet consectetur. Faucibus aliquet laoreet
            rutrum id.
          </p>
        </div>
      </div>
    </footer>
  );
}
