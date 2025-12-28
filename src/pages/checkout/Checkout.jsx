import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, Bounce } from "react-toastify";

const COUPONS = {
  SKINCARE15: {
    category: "skin care",
    percent: 15,
  },
  BODYCARE25: {
    category: "body care",
    percent: 25,
  },
  HAIRCARE10: {
    category: "hair care",
    percent: 10,
  },
  GLOBAL15: {
    category: "all",
    percent: 15,
  },
};

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const categoriesInCart = [
    ...new Set(cartItems.map((item) => item.category.toLowerCase())),
  ];

  const handleDeliveryChange = (e) => {
    setDeliveryCharge(Number(e.target.value));
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const couponData = COUPONS[code];

    if (!couponData) {
      toast.error("Invalid coupon code");
      return;
    }

    // 🔹 Global coupon
    if (couponData.category === "all") {
      const discount = Math.round((totalPrice * couponData.percent) / 100);
      setDiscountPercentage(couponData.percent);
      setDiscountAmount(discount);
      toast.success(`Global coupon applied! ${couponData.percent}% discount`, {
        transition: Bounce,
      });
      return;
    }

    // 🔹 Category-specific coupon
    if (
      categoriesInCart.length !== 1 ||
      categoriesInCart[0] !== couponData.category
    ) {
      toast.error(
        `This coupon is only valid for ${couponData.category} products`
      );
      return;
    }

    const discount = Math.round((totalPrice * couponData.percent) / 100);

    setDiscountPercentage(couponData.percent);
    setDiscountAmount(discount);

    toast.success(`Coupon applied! ${couponData.percent}% discount`, {
      transition: Bounce,
    });
  };

  const finalTotal = totalPrice + deliveryCharge - discountAmount;

  const handleProcess = () => {
    if (!deliveryCharge) {
      toast.error("Please select delivery method");
      return;
    }

    navigate("/final-checkout", {
      state: {
        finalTotal,
        deliveryCharge,
        coupon,
        discountAmount,
        discountPercentage,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-2 gap-8">
      {/* CART */}
      <div>
        <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

        {cartItems.map((item) => (
          <div key={item._id} className="flex gap-4 border p-3 rounded-lg mb-3">
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500 capitalize">
                {item.category}
              </p>
              <p className="font-bold text-green-700">
                ৳{item.price} × {item.quantity} = ৳{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CHECKOUT */}
      <div>
        <h2 className="text-2xl font-bold mb-4">🚚 Checkout</h2>

        {/* DELIVERY */}
        <div className="mb-4">
          <label className="flex gap-2">
            <input
              type="radio"
              name="delivery"
              value="60"
              onChange={handleDeliveryChange}
            />
            Inside Dhaka – ৳60
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              name="delivery"
              value="120"
              onChange={handleDeliveryChange}
            />
            Outside Dhaka – ৳120
          </label>
        </div>

        {/* COUPON */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-2"
          />
          <button
            onClick={applyCoupon}
            className="bg-green-600 text-white w-full py-2 rounded"
          >
            Apply Coupon
          </button>

          {discountAmount > 0 && (
            <p className="text-green-700 mt-2">
              Discount: {discountPercentage}% (৳{discountAmount})
            </p>
          )}
        </div>

        {/* SUMMARY */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>৳{totalPrice}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>৳{deliveryCharge}</span>
          </div>

          <div className="flex justify-between text-red-600">
            <span>Discount</span>
            <span>-৳{discountAmount}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>৳{finalTotal}</span>
          </div>
        </div>

        <button
          onClick={handleProcess}
          className="w-full mt-6 bg-black text-white py-3 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
