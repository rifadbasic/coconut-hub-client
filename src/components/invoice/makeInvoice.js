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
    discount,
    deliveryCharge,
    coupon,
    createdAt,
  } = order;

  // const formattedDate = new Date(createdAt).toLocaleString("en-GB", {
  //   day: "2-digit",
  //   month: "short",
  //   year: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // 12-hour format with AM/PM
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
      Math.round(p.price - (p.price * p.discount) / 100) * p.quantity,
    0
  );

  return `
<!DOCTYPE html>
<html>
<head>
  <title>Invoice - Beauty & Care - ${invoiceNumber}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />

<style>

:root {
    --primary-color: #d54cff;
    --secondary-color: #ff21cf;
    --text-color: #1a1a1a;
    --bg-color: #fbcfff;
  }

  body {
    font-family: 'Segoe UI', sans-serif;
    background: var(--bg-color);
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .page {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
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
    margin: 0;
    font-size: 24px;
    color: var(--secondary-color);
  }

  .subtext {
    text-align: center;
    font-size: 12px;
    margin-top: 4px;
    color: #555;
  }

  .section-title {
    font-size: 16px;
    margin-top: 18px;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    padding-bottom: 4px;
  }

  .info-flex {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 10px;
  }

  .info-box {
    flex: 1;
    font-size: 13px;
  }

  .info-box p {
    margin: 4px 0;
  }

  table {
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
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
    display: flex;
    flex-direction: column;
    gap: 6px;
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
    font-size: 14px;
  }

  .download-btn {
    background: #0ea5e9;
    color: #fff;
  }

  .cancel-btn {
    background: #dc2626;
    color: #fff;
  }

  /* 📱 MOBILE RESPONSIVE SKIN */
  @media (max-width: 480px) {
    body {
      padding: 10px;
    }

    .container {
      padding: 14px;
      border-radius: 12px;
    }

    .header img {
      width: 42px;
    }

    .header h1 {
      font-size: 20px;
    }

    .subtext {
      font-size: 11px;
    }

    .section-title {
      font-size: 15px;
    }

    .info-flex {
      flex-direction: column;
      gap: 10px;
    }

    .info-box {
      font-size: 12px;
    }

    th, td {
      font-size: 12px;
      padding: 6px;
    }

    .total-row {
      font-size: 13px;
    }

    .button-bar {
      flex-direction: column;
      gap: 10px;
    }

    button {
      font-size: 13px;
      padding: 9px;
    }

    .footer {
      font-size: 12px;
    }
  }
</style>

</head>

<body>
  <div class="page">

    <!-- INVOICE -->
    <div class="container" id="invoiceArea">
      <div class="header">
        <img src="https://i.ibb.co.com/ksfKPmSV/db54023c-7e1a-4662-b797-278b7c209600.jpg" />
        <h1>Beauty & Care</h1>
      </div>
      <p class="subtext">Customer Care: 01765574008 | www.beautycare.com</p>

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
          <p><strong>Payment:</strong> ${
            paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment"
          }</p>
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
          ${cartItems
            .map(
              (item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${Math.round(item.price - (item.price * item.discount) / 100)}</td>
                <td>${
                  Math.round(item.price - (item.price * item.discount) / 100) *
                  item.quantity
                }</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>

      <div class="total-box">
        <div class="total-row"><span>Subtotal</span><strong>${subtotal} TK</strong></div>
        ${coupon ? `<div class="total-row"> <span style=" font-size:12px;">Coupon <strong style="color:var(--primary-color)">(${coupon})</strong></span><strong>- ${discount} TK</strong></div>` : ""}
        ${discount ? `<div class="total-row"><span>Discount</span><strong>-${discount} TK</strong></div>` : ""}
        ${deliveryCharge ? `<div class="total-row"><span>Delivery</span><strong>${deliveryCharge} TK</strong></div>` : ""}
        <div class="total-row" style="font-size:15px;">
          <strong>Grand Total:</strong>
          <strong>${Math.round(subtotal + deliveryCharge - discount)} TK</strong>
        </div>
      </div>

      <div class="footer">
        <div><i class="fa-solid fa-heart"></i> Thank you for shopping with Beauty & Care</div>
        <div style="margin-top:6px; font-size:12px; color:#888;">
          Developed by RifadBasic | <a href="https://github.com/rifadbasic" target="_blank" style="color:var(--primary-color); text-decoration: none;">rifadbasic</a>
        </div>
      </div>
    </div>

    <!-- ✅ BUTTONS NOW CORRECTLY BELOW -->
    <div class="button-bar">
      <button class="download-btn" onclick="downloadPDF()">
        <i class="fa-regular fa-file-pdf"></i> Download PDF
      </button>
      <button class="cancel-btn" onclick="window.close()">Close</button>
    </div>

  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <script>
    function downloadPDF() {
      html2pdf().from(document.getElementById("invoiceArea")).save("BeautyCare_Invoice_${invoiceNumber}.pdf");
    }
  </script>
</body>
</html>
`;
};
