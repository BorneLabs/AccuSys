import { useState, useEffect } from "react";
import Navbar from "./layout/NavBar";
import Sidebar from "./layout/SideBar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OtpVerification from "./Screen/auth/OtpVerification";
import ProtectedRoute from "./config/ProtectedRoute";
import Login from "./Screen/auth/LoginPage";
import AdminDashboard from "./Screen/admin/DashBoard/DashBoard";

import Inventory from "./Screen/superAdmin/Inventory/index";
import CreateInventory from "./Screen/superAdmin/Inventory/Create";
import ViewInventory from "./Screen/superAdmin/Inventory/view"

import { decryptData } from "./utils/authUtils";
import useAxios from "./hooks/useAxios";
import { ToastContainer } from "react-toastify";
import Redirector from "./config/Redirect";
import Reports from "./Screen/superAdmin/reports";
import Clients from "./Screen/superAdmin/clients";
import Users from "./Screen/superAdmin/users";
import Settings from "./Screen/superAdmin/settings";
import AddUser from "./Screen/superAdmin/users/AddUser";

function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const { get } = useAxios();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const decryptedUser = decryptData(storedUser);
        if (decryptedUser) {
          setUser(decryptedUser);
        }
      } catch (error) {
        console.error("Error decrypting user data", error);
        localStorage.removeItem("user"); // Remove corrupted data
      }
    }
  }, []);

  useEffect(() => {
    if (user?.role) {
      document.title = `${user.role} Dashboard | Rift Cars`;
    } else {
      document.title = "Rift Cars";
    }
  }, [user]);

  const handleLogin = () => {
    const enuser = localStorage.getItem("user");
    const user = decryptData(enuser);
    setUser(user);
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <Redirector />

        {/* If user is logged in, show Navbar & Sidebar */}
        {user ? (
          <div className="">
            
            {/* Sidebar (Parent of Content) */}
            <Sidebar role={user.role} isOpen={sidebarOpen} setIsOpen={setSidebarOpen}>

              <div className="flex-1 flex flex-col">

                {/* Navbar (Aligned properly) */}
                <Navbar role={user.role} isOpen={sidebarOpen} isMobile={isMobile} />

                {/* Main Content (Takes full width minus Sidebar) */}
                <div className="w-full p-6 mt-16">
                  <Routes>
                    <Route element={<ProtectedRoute allowedRoles={["admin"]} userRole={user?.role} />}>
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["admin"]} userRole={user?.role} />}>
                      <Route path="/inventory" element={<Inventory />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["admin"]} userRole={user?.role} />}>
                      <Route path="/inventory/add" element={<CreateInventory />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["admin"]} userRole={user?.role} />}>
                      <Route path="/inventory/view/:id" element={<ViewInventory/>} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["admin"]} userRole={user?.role} />}>
                      <Route path="/report" element={<Reports />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["admin"]} userRole={user?.role} />}>
                      <Route path="/automobile" element={<Clients />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["admin"]} userRole={user?.role} />}>
                      <Route path="/systemUsers" element={<Users />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["admin"]} userRole={user?.role} />}>
                      <Route path="/systemUsers/Add" element={<AddUser />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["admin"]} userRole={user?.role} />}>
                      <Route path="/adminSettings" element={<Settings />} />
                    </Route>


                    <Route path="*" element={<h2>Page Not Found</h2>} />
                  </Routes>
                </div>
              </div>
            </Sidebar>
          </div>
        ) : (
          // Login Page (Fix full screen issue)
          <div className="min-h-screen  bg-[#F0F5FF]">
            <Routes>
              <Route path="/login" element={<Login setUser={setUser} onLogin={handleLogin} />} />
              <Route path="/verify-otp" element={<OtpVerification onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        )}
      </Router>
    </>
  );
}

export default App;
