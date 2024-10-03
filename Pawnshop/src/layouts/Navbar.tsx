import burgerIcon from "../assets/icons/burger.svg";

type NavbarProps = {
  toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <div className="w-full h-16 bg-red-500 text-white flex items-center justify-between px-4">
      <button onClick={toggleSidebar} className="focus:outline-none">
        <img src={burgerIcon} alt="Menu" className="h-8 w-8" />
      </button>
      <div className="text-lg">Navbar</div>
    </div>
  );
}
