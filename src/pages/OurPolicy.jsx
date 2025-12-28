import React from "react";

const OurPolicy = () => {

   // dynamic title
    document.title = "Beauty & Care | Return & Refund Policy";


  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-4">
        Return & Refund Policy
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Because your beauty, care, and trust matter to us 🤍
      </p>

      {/* Policy Sections */}
      <div className="space-y-8">
        {/* Eligibility */}
        <div className="border p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">
            🌸 Return Eligibility
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Returns are accepted within <strong>7 days</strong> of delivery.</li>
            <li>Products must be unused, unopened, and in original packaging.</li>
            <li>Proof of purchase (invoice/order ID) is required.</li>
          </ul>
        </div>

        {/* Non-returnable */}
        <div className="border p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">
            🚫 Non-Returnable Items
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Opened or used beauty & skincare products.</li>
            <li>Products damaged due to misuse or improper storage.</li>
            <li>Items purchased on clearance or special offers.</li>
          </ul>
        </div>

        {/* Damaged / Wrong Product */}
        <div className="border p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">
            📦 Damaged or Wrong Products
          </h2>
          <p className="text-gray-700">
            If you receive a damaged or incorrect product, please contact us
            within <strong>48 hours</strong> of delivery with clear photos.
            We’ll replace it or issue a refund—no drama, no stress.
          </p>
        </div>

        {/* Refund Process */}
        <div className="border p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">
            💸 Refund Process
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Approved refunds are processed within 5–7 working days.</li>
            <li>Refunds will be sent to the original payment method.</li>
            <li>Shipping charges are non-refundable (unless we made the mistake).</li>
          </ul>
        </div>

        {/* Brand Promise */}
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-green-700">
            💚 Our Beauty & Care Promise
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>We sell only safe, authentic, and quality-checked products.</li>
            <li>Your skin and well-being come before profit—always.</li>
            <li>If something feels wrong, we’ll listen first, fix fast.</li>
          </ul>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-center text-sm text-gray-500 mt-10">
        Still have questions? Reach out to our support team—we’re here to help 🌿
      </p>
    </div>
  );
};

export default OurPolicy;
