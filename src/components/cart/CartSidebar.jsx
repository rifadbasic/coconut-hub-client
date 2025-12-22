import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router";

const CartSidebar = () => {
  const {
    isCartOpen,
    toggleCart,
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate("/checkout");
  };

  // console.log(cartItems)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={toggleCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-90 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-[var(--secondary-color)]">Your Cart 🛒</h2>
              <button onClick={toggleCart}>
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">Cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 border p-2 rounded-lg"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[var(--secondary-color)] mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      <p className="text-[var(--secondary-color)] font-bold">
                        ৳
                        {Math.round(
                          item.price - (item.price * item.discount) / 100 || []
                        ) * item.quantity}
                      </p>
                      

                      {/* Qty controls */}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => decreaseQty(item._id)}
                          className="p-1 border rounded hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() => increaseQty(item._id)}
                          className="p-1 border rounded hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-1 hover:bg-red-100 rounded-full"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                    
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Total Price:</span>
                <span className="font-bold text-[var(--secondary-color)]">
                  ৳{Math.round(totalPrice)}
                </span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className={`w-full py-2 rounded-lg text-white font-semibold ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[var(--secondary-color)] hover:bg-[var(--primary-color)]"
                }`}
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
