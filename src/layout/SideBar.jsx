import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCar,
  FaChartBar,
  FaUsers,
  FaUser,
  FaCog,
} from "react-icons/fa";
import RiftLogo from "../assets/Rift-Cars-Limited-2-1.png";

const Sidebar = ({ role, children, isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  // Update screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false); // collapse on small screens
      } else {
        setIsOpen(true); // expand on large screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // run once on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = {
    admin: [
      { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
      { name: "Inventory", path: "/inventory", icon: <FaCar /> },
      { name: "Report", path: "/report", icon: <FaChartBar /> },
      { name: "Clients", path: "/automobile", icon: <FaUsers /> },
      { name: "User", path: "/systemUsers", icon: <FaUser /> },
      { name: "Settings", path: "/adminSettings", icon: <FaCog /> },
    ],
    // repeat for other roles...
  };

  return (
    <div className="flex">
      {/* Toggle button on small screens */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 text-white bg-[#002A5E] p-2 rounded-md md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#002A5E] text-white transition-all duration-300 z-40
        ${isOpen ? "w-64" : "w-20"} ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-4">
          <img
            src={RiftLogo}
            alt="Rift Cars Logo"
            className={`transition-all duration-300 ${isOpen ? "w-40" : "w-0 hidden"}`}
          />
        </div>

        <ul className="mt-4 space-y-1">
          {menuItems[role]?.map((item, index) => (
            <li key={index} className="group relative">
              <Link
                to={item.path}
                onClick={() => isMobile && setIsOpen(false)} // auto-close on click in mobile
                className={`flex items-center gap-4 py-3 px-4 rounded-md transition-all duration-200
                ${location.pathname === item.path
                    ? "bg-[#0056A6]"
                    : "hover:bg-[#F0F5FF] hover:text-[#0056A6]"
                  }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className={`whitespace-nowrap transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 invisible"
                    }`}
                >
                  {item.name}
                </span>
              </Link>

              {/* Tooltip for collapsed menu */}
              {!isOpen && !isMobile && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max bg-[#0056A6] text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {item.name}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for small screens when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${isMobile ? "ml-0" : isOpen ? "ml-64" : "ml-20"
          }`}
      >

        {children}
      </div>
    </div>
  );
};

export default Sidebar;
