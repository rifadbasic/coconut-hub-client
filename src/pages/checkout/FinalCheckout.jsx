import { Link, useLocation } from "react-router";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { makeInvoiceHTML } from "../../components/invoice/makeInvoice";
import { toast, Bounce } from "react-toastify";

const FinalCheckout = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const { finalTotal = 0 } = location.state || {};
  const discount = location.state?.discount || 0;
  const deliveryCharge = location.state?.deliveryCharge || 0;
  const coupon = location.state?.coupon || "";
  const axios = useAxios();

  console.log(cartItems);

  // Generate Invoice Number
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

  // console.log(formData);

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
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
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
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    if (cartItems.length === 0) {
      return toast.error("Your cart is empty", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    const invoiceNumber = generateInvoiceNumber();

    const order = {
      invoiceNumber,
      ...formData,
      cartItems: cartItems.map((item) => ({
        _id: item._id, // productId
        name: item.name,
        price: Number(item.finalPrice),
        quantity: item.quantity,
      })),
      finalTotal: Number(finalTotal),
      discount: Number(discount || 0),
      deliveryCharge: Number(deliveryCharge || 0),
      coupon,
      status: "pending",
      createdAt: new Date(),
    };

    // console.log(order);
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
      {/* Left: Customer Info */}
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

      {/* Right: Payment & Policy */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--secondary-color)] mb-4">
          💳 Payment & Policy
        </h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Select Payment Method:</h3>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === "cod"}
              onChange={handleChange}
            />
            <span>Cash on Delivery</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={handleChange}
            />
            <span>Card Payment</span>
          </label>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Return Policy:</h3>
          <p className="text-sm text-gray-600 mb-2">
            You can return products within 7 days of receiving the order if the
            product is damaged or not as described.
          </p>

          <label className="flex items-center gap-2">
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
                className="text-[var(--secondary-color)] hover:text-[var(--primary-color)] font-semibold"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>

        <div className="border-t pt-4 mt-4">
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
