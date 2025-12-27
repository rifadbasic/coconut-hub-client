import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, Bounce } from "react-toastify";

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // console.log(totalPrice)
  const navigate = useNavigate();

  const handleDeliveryChange = (e) => {
    setDeliveryCharge(Number(e.target.value));
  };

  const applyCoupon = () => {
    if (coupon.trim().toLowerCase() === "coconut10") {
      setDiscount(0.1 * totalPrice);
    } else {
      setDiscount(0);
    }
  };

  const finalTotal = totalPrice + deliveryCharge - discount;

  const handleProcess = () => {
    if (deliveryCharge === 0 || finalTotal <= 0) {
      toast.error("Please select a delivery method", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }) ;
      return; // Stop navigation
    }

    navigate("/final-checkout", {
      state: {
        finalTotal,
        deliveryCharge,
        discount,
        coupon,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left - Cart Summary */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--secondary-color)] mb-4">🛍️ Your Cart</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-3 rounded-lg"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-[var(--secondary-color)] font-bold">
                  ৳
                  {Math.round(item.price - (item.price * item.discount) / 100) || []}
                  × {item.quantity} = ৳
                  {Math.round(
                      item.price - (item.price * item.discount) / 100
                     || []
                  ) * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Options */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--secondary-color)] mb-4">
          🚚 Delivery & Coupon
        </h2>

        {/* Delivery Options */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Choose Delivery Option:</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="delivery"
                value="60"
                onChange={handleDeliveryChange}
              />
              <span>Inside Dhaka - ৳60</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="delivery"
                value="120"
                onChange={handleDeliveryChange}
              />
              <span>Outside Dhaka - ৳120</span>
            </label>
          </div>
        </div>

        {/* Coupon */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Apply Coupon:</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border rounded-lg px-3 py-2 flex-1"
            />
            <button
              onClick={applyCoupon}
              className="bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg"
            >
              Apply
            </button>
          </div>
          {discount > 0 && (
            <p className="text-[var(--secondary-color)] mt-2">
              Coupon applied! You saved ৳{Math.round(discount)}
            </p>
          )}
        </div>

        {/* Price Summary */}
        <div className="border-t pt-4 space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>৳{totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge:</span>
            <span>৳{deliveryCharge}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span>- ৳{Math.round(discount)}</span>
          </div>
          <div className="flex justify-between font-bold text-[var(--secondary-color)] text-lg">
            <span>Total:</span>
            <span>৳{Math.round(finalTotal)}</span>
          </div>
        </div>

        <button
          onClick={handleProcess}
          disabled={cartItems.length === 0}
          className={`w-full mt-6 py-3 rounded-lg text-white font-semibold ${
            cartItems.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[var(--secondary-color)] hover:bg-[var(--primary-color)]"
          }`}
        >
          Process
        </button>
      </div>
    </div>
  );
};

export default Checkout;
