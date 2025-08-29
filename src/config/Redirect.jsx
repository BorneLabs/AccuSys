import { decryptData } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { useRef,useEffect } from "react";

const Redirector = () => {
  const navigate = useNavigate();
  const hasNavigated = useRef(false); 

  useEffect(() => {
    if (hasNavigated.current) return; 
    hasNavigated.current = true; 

      const enuser = localStorage.getItem("user");
      const user = decryptData(enuser)

    if (user) {
      if (user.role === "super_admin") {
        navigate('/admin/dashboard');
      } else if (user.role === 'sales_person') {
        navigate("/sales/dashboard");
      }else if (user.role=== 'admin'){
          navigate('/admin/dashboard')
       
      } else {
        navigate('/login')
      }
    }
  }, [navigate]);

  return null;
};

export default Redirector;