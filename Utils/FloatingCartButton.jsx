import { ShoppingCart } from "lucide-react";
import { useCart } from "../src/context/CartContext";

const FloatingCartButton = ({ toggleCart }) => {
  const { cartCount, toggleCart: toggleCartContext } = useCart();

  return (
    <button
      onClick={() => {
        toggleCart();
        toggleCartContext();
      }}
      className="fixed bottom-60 lg:bottom-100 right-6 bg-[var(--secondary-color)] text-white p-4 rounded-full shadow-lg hover:bg-[var(--secondary-color)] duration-200 z-80"
    >
      <ShoppingCart className="w-6 h-6 text-gray-700" />

      {cartCount > 0 && (
        <span
          className="
            absolute
            -top-1
            -right-1
            bg-[var(--primary-color)]
            text-white
            text-xs
            w-5
            h-5
            rounded-full
            flex
            items-center
            justify-center
          "
        >
          {cartCount}
        </span>
      )}
    </button>
  );
};

export default FloatingCartButton;
