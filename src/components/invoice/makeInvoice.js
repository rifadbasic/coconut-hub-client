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

  const formattedDate = new Date(createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });


  // subtotal
  const subtotal = cartItems.reduce(
    (sum, p) => sum + Math.round((p.price - (p.price * p.discount) / 100)) * p.quantity,
    0
  );

  return `
<html>
  <head>
    <title>Invoice - Coconut BD - ${invoiceNumber}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />

    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background: #f3f4f6;
        margin: 0;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .container {
        width: 100%;
        max-width: 600px; /* SMALL & CLEAN */
        background: white;
        padding: 18px;
        border-radius: 14px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.12);
      }

      h1 {
        text-align: center;
        margin: 0;
        color: #16a34a;
        font-size: 24px;
      }

      .subtext {
        text-align: center;
        font-size: 12px;
        margin: 0;
        color: #555;
      }

      .section-title {
        font-size: 16px;
        margin-top: 18px;
        font-weight: 600;
        border-bottom: 1px solid #ddd;
        padding-bottom: 4px;
      }

      .info p {
        margin: 4px 0;
        font-size: 13px;
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
      }

      th {
        background: #f0fdf4;
        font-weight: 600;
      }

      /* TOTAL FLEX BOX */
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

      /* BUTTONS BELOW INVOICE */
      .button-bar {
        margin-top: 15px;
        display: flex;
        justify-content: center;
        gap: 12px;
        width: 100%;
        max-width: 600px;
      }

      button {
        flex: 1;
        padding: 10px 0;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
      }

      .download-btn {
        background: #0ea5e9;
        color: white;
      }

      .cancel-btn {
        background: #dc2626;
        color: white;
      }

      @media(max-width: 480px) {
        .container { padding: 12px; }
        table th, table td { font-size: 12px; }
        button { font-size: 13px; }
      }
    </style>
  </head>

  <body>
    <div class="container" id="invoiceArea">
      <h1><i class="fa-solid fa-shop"></i> Coconut BD</h1>
      <p class="subtext">Customer Care: 01765574008 | www.coconutbd.com</p>

      <div class="section-title">Invoice Info</div>
      <div class="info">
        <p><strong>Invoice:</strong> ${invoiceNumber}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
      </div>

      <div class="section-title">Customer Details</div>
      <div class="info">
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
        ${
          address || division || zip
            ? `<p><strong>Address:</strong> ${address || ""}, ${
                division || ""
              }, ${zip || ""}</p>`
            : ""
        }
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
                <td>${Math.round(
                    item.price - (item.price * item.discount) / 100
                   || []
                )}</td>
                <td>${
                  Math.round(
                      item.price - (item.price * item.discount) / 100
                     || []
                  ) * item.quantity
                }</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>

      <div class="total-box">
        <div class="total-row"><span>Subtotal:</span><strong>${subtotal} TK</strong></div>
        ${
          discount
            ? `<div class="total-row"><span>Discount:</span><strong>-${Math.round(
                discount
              )} TK</strong></div>`
            : ""
        }
        ${
          deliveryCharge
            ? `<div class="total-row"><span>Delivery Charge:</span><strong>${deliveryCharge} TK</strong></div>`
            : ""
        }
        ${
          coupon
            ? `<div class="total-row"><span>Coupon:</span><strong>${coupon}</strong></div>`
            : ""
        }
        <div class="total-row" style="font-size:15px;">
          <span><strong>Grand Total:</strong></span>
          <strong>${Math.round(
            subtotal + deliveryCharge - discount
          )} TK</strong>
        </div>
      </div>

      <div class="section-title">Payment</div>
      <p><strong>Method:</strong> ${
        paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment"
      }</p>

      <div class="footer">
        <i class="fa-solid fa-heart"></i> Thank you for shopping with Coconut BD!  
        <br/>We appreciate your support.
      </div>
    </div>

    <!-- BUTTONS BELOW -->
    <div class="button-bar">
      <button class="download-btn" onclick="downloadPDF()"><i class="fa-regular fa-file-pdf"></i> Download PDF</button>
      <button class="cancel-btn" onclick="window.close()"><i class="fa-solid fa-xmark"></i> Close</button>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <script>
      function downloadPDF() {
        const element = document.getElementById('invoiceArea');
        const opt = {
          margin: 0.4,
          filename: 'CoconutBD_Invoice_${invoiceNumber}.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
      }
    </script>
  </body>
</html>
`;
};
