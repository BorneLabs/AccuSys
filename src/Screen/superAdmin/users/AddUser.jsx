import React, { useState } from 'react'
import TextInput from '@/components/inputs/TextInput'
import SubmitButton from '@/components/button/submitButton';
import SelectInput from '@/components/inputs/SelectInput';
import PhoneNumberInput from '@/components/inputs/PhoneNumberInput';
import { toast } from 'react-toastify'; // ✅ Import toast
import 'react-toastify/dist/ReactToastify.css'; // ✅ Import toast CSS

const AddUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",  // ✅ Ensure correct state key
        role: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const requiredFields = ['name', 'phoneNumber', 'role'];
        const newErrors = {};

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = `This ${field} is required`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            toast.success("User added successfully!");
            console.log("Form data:", formData);
            // Reset form after successful submission
            setFormData({ name: "", phoneNumber: "", role: "" });
        } else {
            toast.error("Please fill in all required fields.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-4 sm:px-10">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10 uppercase tracking-wider">
                    Add New User
                </h2>
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Name Input */}
                        <TextInput
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                        />

                        {/* Phone Number Input*/}
                        <PhoneNumberInput
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            error={errors.phoneNumber}
                        />

                        {/* Select Role Input */}
                        <SelectInput
                            label="User Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            options={["Admin", "Salesperson", "Mechanic", "Accountant", "Customer Service", "Manager"]}
                            error={errors.role}
                        />
                    </div>

                    <SubmitButton type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddUser;
