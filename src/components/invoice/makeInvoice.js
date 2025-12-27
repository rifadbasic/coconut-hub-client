export const makeInvoiceHTML = (order) => {
  const {
    invoiceNumber,
    name,
    phone,
    email,
    address,
    division,
    zip,
    paymentMethod,
    cartItems,
    discount = 0,
    deliveryCharge = 0,
    coupon,
    createdAt,
  } = order;

  const formattedDate = new Date(createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const subtotal = cartItems.reduce(
    (sum, p) =>
      sum +
      Math.round(p.price ) * p.quantity,
    0
  );

  const grandTotal = subtotal - discount + deliveryCharge;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <title>Invoice - Beauty & Care - ${invoiceNumber}</title>

  <!-- ✅ Bangla-safe Unicode Font -->
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />

<style>
:root {
  --primary-color: #d54cff;
  --secondary-color: #ff21cf;
  --text-color: #1a1a1a;
  --bg-color: #fbcfff;
}

* {
  box-sizing: border-box;
}

/* 🔐 FORCE UNICODE FONT EVERYWHERE */
body, table, th, td, button, p, span, div {
  font-family: 'Noto Sans Bengali', 'Segoe UI', sans-serif !important;
}

body {
  background: var(--bg-color);
  padding: 20px;
  display: flex;
  justify-content: center;
}

.page {
  width: 100%;
  max-width: 600px;
}

.container {
  background: #fff;
  padding: 18px;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0,0,0,.12);
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.header img {
  width: 55px;
}

.header h1 {
  font-size: 24px;
  color: var(--secondary-color);
}

.subtext {
  text-align: center;
  font-size: 12px;
  color: #555;
}

.section-title {
  font-size: 16px;
  margin-top: 18px;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
}

.info-flex {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 10px;
}

.info-box {
  font-size: 13px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 8px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
  text-align: center;
}

th {
  background: var(--bg-color);
}

.total-box {
  margin-top: 12px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.footer {
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  color: #444;
}

.button-bar {
  margin-top: 15px;
  display: flex;
  gap: 12px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.download-btn {
  background: #0ea5e9;
  color: white;
}

.cancel-btn {
  background: #dc2626;
  color: white;
}
</style>
</head>

<body>
  <div class="page">

    <div class="container" id="invoiceArea">
      <div class="header">
        <img src="https://i.ibb.co.com/ksfKPmSV/db54023c-7e1a-4662-b797-278b7c209600.jpg" />
        <h1>Beauty & Care</h1>
      </div>

      <p class="subtext">Customer Care: 01765574008</p>

      <div class="section-title">Invoice Details</div>

      <div class="info-flex">
        <div class="info-box">
          <p><strong>Name:</strong> ${name || "-"}</p>
          <p><strong>Phone:</strong> ${phone || "-"}</p>
          <p><strong>Email:</strong> ${email || "-"}</p>
          <p><strong>Address:</strong> ${address || ""} ${division || ""} ${zip || ""}</p>
        </div>

        <div class="info-box">
          <p><strong>Invoice:</strong> ${invoiceNumber}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Payment:</strong> ${paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment"}</p>
        </div>
      </div>

      <div class="section-title">Order Summary</div>

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
          ${cartItems.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>${Math.round(item.price)} TK</td>
              <td>${Math.round(item.price * item.quantity)} TK</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="total-box">
        <div class="total-row"><span>Subtotal</span><strong>${subtotal} TK</strong></div>
        ${coupon ? `<div class="total-row"><span>Coupon (${coupon})</span><strong>- ${Math.round(discount)} TK</strong></div>` : ""}
        <div class="total-row"><span>Delivery</span><strong>${deliveryCharge} TK</strong></div>
        <div class="total-row" style="font-size:15px;">
          <strong>Grand Total</strong>
          <strong>${Math.round(grandTotal)} TK</strong>
        </div>
      </div>

      <div class="footer">
        <i class="fa-solid fa-heart"></i> Thank you for shopping with Beauty & Care
      </div>
    </div>

    <div class="button-bar">
      <button class="download-btn" onclick="downloadPDF()">Download PDF</button>
      <button class="cancel-btn" onclick="window.close()">Close</button>
    </div>

  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <script>
    function downloadPDF() {
      html2pdf({
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(document.getElementById("invoiceArea"))
        .save("BeautyCare_Invoice_${invoiceNumber}.pdf");
    }
  </script>
</body>
</html>
`;
};
