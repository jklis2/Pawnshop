import HomeNavbar from "../layouts/HomeNavbar";
import Footer from "../layouts/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <div className="flex-grow p-4">
        <h1>Home Page</h1>
        <p>Welcome to the Home page!</p>
      </div>
      <Footer />
    </div>
  );
}
