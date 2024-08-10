import MobileSidebar from "./MobileSidebar";
import NavbarRoutes from "./Navbar-Routes";

const Navbar = () => {
  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
      {/* Mobile Routes */}
      <MobileSidebar />

      {/* Sidebar Routes */}
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
