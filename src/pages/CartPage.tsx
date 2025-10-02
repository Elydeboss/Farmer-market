import { NavLink } from "react-router-dom";
import { CircleArrowLeft, Trash2, Heart, Plus, Minus } from "lucide-react";
import { Product } from "../type/products";

type CartItem = {
  product: Product;
  quantity: number;
  favorite?: boolean;
};

type Props = {
  cartItems: CartItem[];
  onUpdateQty: (id: number, newQty: number) => void;
  onRemove: (id: number) => void;
  onToggleFavorite: (id: number) => void;
};

const CartPage = ({
  cartItems,
  onUpdateQty,
  onRemove,
  onToggleFavorite,
}: Props) => {
  /* Calculate Totals */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryFee = 2000;
  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <>
      <div className="max-w-[1100px] mx-auto px-6 pt-8 pb-10 grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* CARTS LEFT */}
        <div className="md:col-span-2 space-y-6 md:border-r-2">
          {/* HEADER */}
          <div className="flex items-center gap-8">
            <NavLink to="/marketplace" className="text-2xl   cursor-pointer">
              <CircleArrowLeft className="w-7 h-7  text-pri" />
            </NavLink>
            <h2 className="text-black font-bold text-2xl">Cart</h2>
          </div>

          {/* CART LIST */}

          {cartItems.map(({ product, quantity }) => {
            const lineTotal = product.price * quantity;

            return (
              <div
                key={product.id}
                className="flex items-center justify-between border-b-[#cccccc] pb-4 "
              >
                {/* LEFT IMAGE */}
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-[#333]">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-800">{product.farm}</p>
                    <p className="text-sm font-medium text-gray-700">
                      ₦{product.price.toLocaleString()}/{product.unit}
                    </p>
                  </div>
                </div>

                {/* RIGHT PART */}

                <div className="flex items-center gap-4">
                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center">
                    <button className="p-3 text-gray-500 hover:bg-gray-100">
                      <Minus size={18} />
                    </button>
                    <span className="px-3"> {quantity} </span>
                    <button className="p-3 text-gray-500 hover:bg-gray-100">
                      <Minus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CartPage;
