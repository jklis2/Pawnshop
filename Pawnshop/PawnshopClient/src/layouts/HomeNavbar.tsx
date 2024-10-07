export default function HomeNavbar() {
  return (
    <div className="w-full h-16 bg-blue-500 text-white flex items-center justify-between px-4">
      <div className="text-lg">Home Navbar</div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
