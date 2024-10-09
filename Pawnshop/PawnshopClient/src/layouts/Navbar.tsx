import { useState } from "react";
import burgerIcon from "../assets/icons/burger.svg";

type NavbarProps = {
  toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="w-full h-16 bg-red-500 text-white flex items-center justify-between px-4 relative">
      <button onClick={toggleSidebar} className="focus:outline-none">
        <img src={burgerIcon} alt="Menu" className="h-8 w-8" />
      </button>
      <div className="text-lg flex items-center space-x-4">
        <span>John Doe</span>
        <div
          className="w-8 h-8 bg-white rounded-full cursor-pointer flex items-center justify-center"
          onClick={toggleDropdown}
        ></div>
        {isDropdownVisible && (
          <div className="absolute top-16 right-4 w-40 bg-white text-black shadow-lg rounded-md">
            <ul className="flex flex-col p-2">
              <li className="hover:bg-gray-200 cursor-pointer p-2 rounded">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
