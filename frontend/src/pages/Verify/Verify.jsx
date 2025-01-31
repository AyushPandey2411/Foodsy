import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Verify = () => {
  // Retrieve URL query parameters
  const [searchParams] = useSearchParams();
  const success = useParams()
  const orderId = useParams()

  // Retrieve backend URL from Context API
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  // Function to verify payment status
  const verifyPayment = async () => {
    try {
      if (!success || !orderId) {
        navigate("/"); // Redirect if parameters are missing
        return;
      }

      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });

      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/error");
    }
  };

  // Trigger verification on component mount
  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Verifying your payment, please wait...</p>
    </div>
  );
};

export default Verify;
