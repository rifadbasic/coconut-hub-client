import { useLocation } from "react-router";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { makeInvoiceHTML } from "../../components/invoice/makeInvoice";

const FinalCheckout = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const { finalTotal = 0 } = location.state || {};
  const discount = location.state?.discount || 0;
  const deliveryCharge = location.state?.deliveryCharge || 0;
  const coupon = location.state?.coupon || "";
  const axios = useAxios();

  // Generate Invoice Number
  const generateInvoiceNumber = () => {
    const previous = localStorage.getItem("invoiceCounter");
    const newCount = previous ? parseInt(previous) + 1 : 1;
    localStorage.setItem("invoiceCounter", newCount);
    return `INV-cocoBD-${String(newCount).padStart(9, "0")}`;
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
      return alert("You must agree with our return policy.");
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.division
    ) {
      return alert("Please fill in all required fields.");
    }

    const invoiceNumber = generateInvoiceNumber();

    const order = {
      invoiceNumber,
      ...formData,
      cartItems,
      finalTotal,
      discount,
      deliveryCharge,
      coupon,
      status: "Pending",
      createdAt: new Date(),
    };

    console.log(order);
    try {
      const response = await axios.post("/orders", order);
      // console.log(response.data);

      if (response.data.success === true) {
        // makeInvoiceHTML(formData, cartItems, finalTotal);
        const invoiceHTML = makeInvoiceHTML(order);
        const blob = new Blob([invoiceHTML], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");

        // clear local storage after successful order
        localStorage.removeItem("cartItems");
        localStorage.removeItem("finalTotal");
        localStorage.removeItem("discount");
        localStorage.removeItem("deliveryCharge");
        localStorage.removeItem("coupon");

        // navigate to home
        window.location.replace("/");
      }
    } catch (err) {
      alert("Failed to place order. Please try again.");
      console.log(err);
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
        <h2 className="text-2xl font-bold text-green-700 mb-4">
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
        <h2 className="text-2xl font-bold text-green-700 mb-4">
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
            <span>I agree with the return policy</span>
          </label>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total Price:</span>
            <span className="text-green-700">৳{Math.round(finalTotal)}</span>
          </div>

          <button
            onClick={handleCompleteOrder}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalCheckout;
