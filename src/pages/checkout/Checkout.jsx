import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router";

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  console.log(cartItems);

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
        <h2 className="text-2xl font-bold text-green-700 mb-4">🛍️ Your Cart</h2>
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
                <p className="text-green-700 font-bold">
                  ৳{item.finalPrice == 0 ? item.price : item.discountPrice} × {item.quantity} = ৳
                  {item.finalPrice * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Options */}
      <div>
        <h2 className="text-2xl font-bold text-green-700 mb-4">
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
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Apply
            </button>
          </div>
          {discount > 0 && (
            <p className="text-green-600 mt-2">
              Coupon applied! You saved ৳{discount}
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
            <span>- ৳{discount}</span>
          </div>
          <div className="flex justify-between font-bold text-green-700 text-lg">
            <span>Total:</span>
            <span>৳{finalTotal}</span>
          </div>
        </div>

        <button
          onClick={handleProcess}
          disabled={cartItems.length === 0}
          className={`w-full mt-6 py-3 rounded-lg text-white font-semibold ${
            cartItems.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Process
        </button>
      </div>
    </div>
  );
};

export default Checkout;
