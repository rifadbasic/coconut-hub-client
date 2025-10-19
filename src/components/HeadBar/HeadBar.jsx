import React from "react";

const HeadBar = () => {
  return (
    <div>
      <div className="bg-green-600 text-white py-2 px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        {/* Left side - Contact number */}
        <div className="flex items-center gap-2">
          <span className="font-semibold">🏬 Address:</span>
          <span>22 Coconut Street, Bagerhat, Khulna</span>
        </div>

        {/* Right side - Shop address */}

        <div className="flex items-center gap-2">
          <span className="font-semibold">📞 Contact:</span>
          <span>+880 1712-345678</span>
        </div>
      </div>
    </div>
  );
};

export default HeadBar;
