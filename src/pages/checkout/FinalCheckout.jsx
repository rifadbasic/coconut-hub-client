import { useLocation } from "react-router";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const FinalCheckout = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const { finalTotal = 0 } = location.state || 0;
  const discount = location.state?.discount || 0;
  const deliveryCharge = location.state?.deliveryCharge || 0;
  const coupon = location.state?.coupon || "";
  const axios = useAxios();
  // console.log(discount,deliveryCharge,coupon);

  // console.log(cartItems.price);

  // genaret invoice data
  const generateInvoiceNumber = () => {
    const current = localStorage.getItem("invoiceCounter");

    let newCount = current ? parseInt(current) + 1 : 1;
    localStorage.setItem("invoiceCounter", newCount);
    const padded = newCount.toString().padStart(9, "0");
    return `INV-cocoBD-${padded}`;
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

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCompleteOrder = async () => {
    if (!formData.agree) {
      alert("You must agree with our return policy.");
      return;
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.division ||
      !formData.zip
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const invoiceNumber = generateInvoiceNumber(); // inv-000000001, inv-000000002...

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

    try {
      const response = await axios.post("/orders", order);
      // console.log(response);
      if (response.data.success == true) {
        const invoiceHTML = `
      <html>
        <head>
          <title>Order Invoice - Coconut BD</title>
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, sans-serif; 
              background: #f9fafb; 
              margin: 0; 
              padding: 20px; 
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .invoice-container { 
              max-width: 800px; 
              width: 100%;
              background: white; 
              border-radius: 12px; 
              padding: 20px; 
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }

            h1 { text-align: center; color: #16a34a; }
            .section-title { font-weight: 600; margin-top: 20px; margin-bottom: 8px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
            .info p { margin: 4px 0; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 14px; }
            th { background: #f0fdf4; }
            .total { font-weight: 700; text-align: right; }
            .button-bar {
              margin-top: 20px; 
              display: flex; 
              justify-content: center; 
              gap: 10px;
            }
            button {
              padding: 10px 20px;
              border: none;
              border-radius: 6px;
              font-weight: 600;
              cursor: pointer;
            }
            .download-btn { background: #0ea5e9; color: white; }
            .cancel-btn { background: #dc2626; color: white; }
          </style>
        </head>
        <body>
          <div class="invoice-container" id="invoice">
            <h1>🥥 Coconut BD</h1>
            <p style="text-align:center; font-size:13px; color:#666;">Helpline: 01700000000 | www.coconutbd.com</p>

            <div class="info">
              <div class="section-title">Customer Info</div>
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Address:</strong> ${formData.address}, ${
          formData.division
        }, ${formData.zip}</p>
            </div>

            <div class="info">
              <div class="section-title">Order Items</div>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${cartItems
                    .map(
                      (item) => `
                      
                      <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>৳${Math.round(item.finalPrice)}</td>
                        <td>৳${Math.round(item.finalPrice) * item.quantity}</td>
                      </tr>
                    `
                    )
                    .join("")}
                </tbody>
              </table>
                <p class="total">Total: ৳${Math.round(finalTotal)}</p>
            </div>

            <div class="info">
              <div class="section-title">Payment</div>
              <p><strong>Method:</strong> ${
                formData.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Card Payment"
              }</p>
            </div>
          </div>

          <div class="button-bar">
            <button class="download-btn" onclick="downloadPDF()">⬇️ Download PDF</button>
            <button class="cancel-btn" onclick="window.close()">❌ Cancel</button>
          </div>

          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
          <script>
            function downloadPDF() {
              const element = document.getElementById('invoice');
              const opt = {
                margin:       0.5,
                filename:     'CoconutBD_Invoice.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  {  scale: 2, width:element.scrollWidth },
                jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
              };
              html2pdf().set(opt).from(element).save();
            }
          </script>
        </body>
      </html>
    `;

        const newWindow = window.open("", "_blank");
        newWindow.document.open();
        newWindow.document.write(invoiceHTML);
        newWindow.document.close();

        // card data delet form local host
        localStorage.clear();
        window.location.href = "/";
      }
    } catch (error) {
     error.alert("Failed to place order. Please try again.");
    }
  };

  // divisions list
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
      {/* Left - Customer Info */}
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
              required
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

      {/* Right - Payment & Policy */}
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
