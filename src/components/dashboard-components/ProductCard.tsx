import type { Product } from "../../type/products";

type Props = {
  product: Product;
  onBuy: (id: number) => void;
};

const ProductCard = ({ product, onBuy }: Props) => {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: product.currency ?? "NGN",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="bg-[#eefcf3] rounded-lg px-4 py-4 flex flex-col h-full shadow-sm ">
      <div className="h-40  w-full mx-auto overflow-hidden rounded-md mb-3 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* HEADER */}
      <div className="mb-3">
        <h3
          id={`product-title-${product.id}`}
          className="text-sm md:text-sm font-semibold mb-2 text-black"
        >
          {product.name}
        </h3>
        <p className="text-xs text-[#333] ">From {product.farm}</p>
      </div>

      {/* PRICE */}
      <div className="my-2">
        <p className="font-bold text-sm text-black">
          {formattedPrice}/{product.unit}
        </p>
      </div>

      {/* BUY BUTTON */}
      <button
        className="mt-auto bg-pri hover:bg-green-600 text-sm  text-white font-semibold text-center w-full py-2 rounded focus:outline-none transition"
        onClick={() => onBuy(product.id)}
      >
        BUY NOW
      </button>
    </div>
  );
};

export default ProductCard;
