import { Link, useLocation } from "react-router";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { makeInvoiceHTML } from "../../components/invoice/makeInvoice";
import { toast, Bounce } from "react-toastify";

const FinalCheckout = () => {

   // dynamic title
    document.title = "Beauty & Care | Final Checkout";


  const { cartItems } = useCart();
  const location = useLocation();
  const axios = useAxios();
  console.log(cartItems);

  // ✅ Values coming from Checkout
  const {
    finalTotal = 0,
    discountAmount = 0,
    discountPercentage = 0,
    deliveryCharge = 0,
    coupon = "",
  } = location.state || {};

  // 🧾 Invoice Number Generator
  const generateInvoiceNumber = () => {
    const previous = localStorage.getItem("invoiceCounter");
    const newCount = previous ? parseInt(previous) + 1 : 1;
    localStorage.setItem("invoiceCounter", newCount);
    return `INV-B&C-${String(newCount).padStart(9, "0")}`;
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    division: "",
    zip: "",
    paymentMethod: "cod",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCompleteOrder = async () => {
    if (!formData.agree) {
      return toast.error("Please agree to terms and conditions", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.division
    ) {
      return toast.error("Please fill in all required fields", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }

    if (cartItems.length === 0) {
      return toast.error("Your cart is empty", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }

    const invoiceNumber = generateInvoiceNumber();

    // ✅ ORDER OBJECT (ONLY ADDITION IS discountPercentage)
    const order = {
      invoiceNumber,

      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        division: formData.division,
        zip: formData.zip,
      },

      paymentMethod: formData.paymentMethod,

      cartItems: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: Number(item.finalPrice),
        quantity: item.quantity,
      })),

      pricing: {
        subtotal: cartItems.reduce(
          (sum, item) => sum + item.finalPrice * item.quantity,
          0
        ),
        discountAmount: Number(discountAmount), // ✅ Correct value
        discountPercentage: Number(discountPercentage),
        deliveryCharge: Number(deliveryCharge),
        coupon,
        finalTotal: Number(finalTotal),
      },

      status: "pending",
      createdAt: new Date(),
    };

    try {
      const response = await axios.post("/orders", order);

      if (response.data.success) {
        const invoiceHTML = makeInvoiceHTML(order);
        const blob = new Blob([invoiceHTML], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");

        // 🧹 Clear cart
        localStorage.removeItem("cartItems");
        localStorage.removeItem("finalTotal");
        localStorage.removeItem("discount");
        localStorage.removeItem("discountPercentage");
        localStorage.removeItem("deliveryCharge");
        localStorage.removeItem("coupon");

        window.location.replace("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to place order", {
        position: "top-center",
        autoClose: 2500,
        transition: Bounce,
      });
    }
  };


  

  const divisions = [
    "Dhaka",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--secondary-color)] mb-4">
          📝 Customer Info
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              name="division"
              value={formData.division}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 bg-white"
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={formData.zip}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Right */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--secondary-color)] mb-4">
          💳 Payment & Policy
        </h2>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={formData.paymentMethod === "cod"}
            onChange={handleChange}
          />
          Cash on Delivery
        </label>

        <label className="flex items-center gap-2 mb-4">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={formData.paymentMethod === "card"}
            onChange={handleChange}
          />
          Card Payment
        </label>

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          <span>
            I agree with the{" "}
            <Link
              to="/our-policy"
              className="font-semibold text-[var(--secondary-color)]"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total Price:</span>
            <span className="text-[var(--secondary-color)]">
              ৳{Math.round(finalTotal)}
            </span>
          </div>

          <button
            onClick={handleCompleteOrder}
            className="w-full py-3 bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white rounded-lg font-semibold"
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalCheckout;
