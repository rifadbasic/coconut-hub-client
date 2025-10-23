import { Link } from "react-router";

const Header = () => {
  return (
    <Link to="/shop"
      className="relative w-full h-[60vh] sm:h-[50vh] md:h-[80vh] bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/gZwnC6F5/Whats-App-Image-2025-10-18-at-10-20-12-AM.jpg')",
      }}
    >
      
    </Link>
  );
};

export default Header;
