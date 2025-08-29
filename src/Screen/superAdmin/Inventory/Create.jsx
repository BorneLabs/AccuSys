import { useState } from 'react';
import { toast } from 'react-toastify';

function CreateInventory() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    engineNumber: '',
    chassisNumber: '',
    registrationNumber: '',
    fuel: '',
    color: '',
    transmission: '',
    location: '',
    ownership: '',
    deliveryDate: '',
    duty: '',
    stockNumber: '',
    rating: '',
    logBook: '',
    mileage: '',
    price: '',
  });

  const [errors, setErrors] = useState({ ...formData });

  const validate = () => {
    let isValid = true;
    let tempErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        const label = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
        tempErrors[key] = `${label} is required`;
        isValid = false;
      } else {
        tempErrors[key] = '';
      }
    });

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success('Form submitted successfully!');
      // handle submission here
    }
  };

  const renderInput = (label, name, type = 'text') => (
    <div className="w-full">
      <label className="block text-xs font-semibold text-gray-600 tracking-widest uppercase mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="block w-full px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10 uppercase tracking-wider">
          Vehicle Inventory Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Group 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("Make", "make")}
            {renderInput("Model", "model")}
          </div>

          {/* Group 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderInput("Year", "year", "number")}
            {renderInput("Engine Number", "engineNumber")}
            {renderInput("Transmission", "transmission")}
          </div>

          {/* Group 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderInput("Chassis Number", "chassisNumber")}
            {renderInput("Registration Number", "registrationNumber")}
            {renderInput("Fuel", "fuel")}
          </div>

          {/* Group 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderInput("Color", "color")}
            {renderInput("Location", "location")}
            {renderInput("Ownership", "ownership")}
          </div>

          {/* Group 5 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderInput("Delivery Date", "deliveryDate", "date")}
            {renderInput("Duty", "duty")}
            {renderInput("Stock Number", "stockNumber")}
          </div>

          {/* Group 6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("Rating", "rating")}
            {renderInput("Log Book", "logBook")}
            {renderInput("Mileage", "mileage", "number")}
            {renderInput("Price", "price", "number")}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            {/* className="w-full bg-[#0056A6] text-white p-3 rounded-md font-semibold hover:bg-[#003E7E] transition duration-300" */}
            <button
              type="submit"
              className="bg-[#0056A6] hover:bg-[#003E7E] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Submit Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateInventory;
    