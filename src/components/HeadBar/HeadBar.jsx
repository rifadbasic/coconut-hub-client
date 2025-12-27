import { Phone, MapPinHouse } from "lucide-react";
import React from "react";

const HeadBar = () => {
  return (
    <div>
      <div className="bg-[var(--secondary-color)] text-white py-2 px-4 hidden lg:flex justify-between items-center text-sm">
        {/* Left side - Contact number */}
        <div className="flex items-center gap-2">
          <MapPinHouse size={18} />
          <span className="font-semibold"> Address:</span>
          <span>Bagerhat Sadar, Khulna, Bangladesh</span>
        </div>

        {/* Right side - Shop address */}

        <div className="flex items-center gap-2">
          <Phone size={18} />
          <span className="font-semibold"> Contact:</span>
          <span>+8801765574008</span>
        </div>
      </div>
    </div>
  );
};

export default HeadBar;
