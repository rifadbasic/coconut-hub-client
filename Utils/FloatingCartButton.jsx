import { useState, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../src/context/CartContext";

const FloatingCartButton = () => {
  const { cartCount, toggleCart } = useCart();

  // 📍 Default position (right-middle)
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight / 2,
  });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const moved = useRef(false); // 👈 prevents click while dragging

  /* ================= MOUSE EVENTS ================= */

  const handleMouseDown = (e) => {
    dragging.current = true;
    moved.current = false;

    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    moved.current = true;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  /* ================= TOUCH EVENTS ================= */

  const handleTouchStart = (e) => {
    dragging.current = true;
    moved.current = false;

    const touch = e.touches[0];

    offset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
  };

  const handleTouchMove = (e) => {
    if (!dragging.current) return;
    moved.current = true;

    const touch = e.touches[0];

    setPosition({
      x: touch.clientX - offset.current.x,
      y: touch.clientY - offset.current.y,
    });
  };

  const handleTouchEnd = () => {
    dragging.current = false;
  };

  /* ================= CLICK ================= */

  const handleClick = () => {
    if (!moved.current) {
      toggleCart();
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      style={{
        left: position.x,
        top: position.y,
      }}
      className="
        fixed
        z-70
        bg-[var(--secondary-color)]
        p-4
        rounded-full
        shadow-lg
        cursor-grab
        active:cursor-grabbing
        select-none
        touch-none
      "
    >
      <ShoppingCart className="w-6 h-6 text-white" />

      {cartCount > 0 && (
        <span
          className="
            absolute
            -top-1
            -right-1
            bg-[var(--primary-color)]
            text-white
            text-xs
            w-5
            h-5
            rounded-full
            flex
            items-center
            justify-center
          "
        >
          {cartCount}
        </span>
      )}
    </button>
  );
};

export default FloatingCartButton;
