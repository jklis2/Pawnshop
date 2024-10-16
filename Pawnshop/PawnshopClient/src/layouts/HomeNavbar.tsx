import { Link } from "react-router-dom";
import PawnshopLogo from "../assets/PawnshopLogo.png";

export default function HomeNavbar() {
  return (
    <div className="w-full h-16 bg-emerald-600 text-white flex items-center justify-between px-12">
      <div>
        <img src={PawnshopLogo} alt="Pawnshop Logo" className="h-10" />
      </div>
      <nav>
        <Link to="/login" className="hover:underline text-lg">
          Login
        </Link>
      </nav>
    </div>
  );
}
