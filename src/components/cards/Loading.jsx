import { FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const PopupCard = ({ status = "loading" }) => {
  const getStatusContent = () => {
    switch (status) {
      case "loading":
        return {
          icon: <FaSpinner className="text-green-600 animate-spin text-4xl" />,
          title: "Loading...",
          message: "Please wait while we process your request.",
        };
      case "login":
        return {
          icon: <FaSpinner className="text-blue-600 animate-spin text-4xl" />,
          title: "Logging In",
          message: "Setting up your dashboard...",
        };
      case "submitting":
        return {
          icon: <FaSpinner className="text-purple-600 animate-spin text-4xl" />,
          title: "Submitting",
          message: "We're submitting your data...",
        };
      case "error":
        return {
          icon: <FaExclamationTriangle className="text-red-600 text-4xl" />,
          title: "Error",
          message: "Something went wrong. Please try again.",
        };
      case "success":
        return {
          icon: <FaCheckCircle className="text-green-500 text-4xl" />,
          title: "Success",
          message: "Your request was completed successfully!",
        };
      default:
        return {
          icon: <FaSpinner className="text-gray-600 animate-spin text-4xl" />,
          title: "Processing",
          message: "Please wait...",
        };
    }
  };

  const { icon, title, message } = getStatusContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white w-80 p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-95 animate-fade-in">
        {/* Icon */}
        <div className="flex justify-center items-center mb-4">
          {icon}
        </div>

        {/* Card Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {title}
          </h2>
          <p className="text-gray-700">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
