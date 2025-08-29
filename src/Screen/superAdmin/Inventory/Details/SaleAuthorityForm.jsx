import React, { useState } from 'react';
import TextInput from '@/components/inputs/TextInput';
import SubmitButton from '@/components/button/submitButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SaleAuthorityForm = () => {
    const [formData, setFormData] = useState({
        // Current Owner
        ownerName: '',
        ownerId: '',
        ownerPhone: '',

        // Delivered By
        deliveredByName: '',
        deliveredById: '',
        deliveredByPhone: '',

        // Received By
        receivedByName: '',
        receivedById: '',
        receivedByPhone: '',

        // Agreement Info
        agreementDate: '',
        batterySerialNumber: '',
        priceFrom: '',
        priceTo: '',
        commissionPercentage: '',
        commissionAmount: '',
        registeredName: '',
        logBookNo: '',
        generalRemark: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const requiredFields = [
            'ownerName', 'ownerId', 'ownerPhone',
            'deliveredByName', 'deliveredById', 'deliveredByPhone',
            'receivedByName', 'receivedById', 'receivedByPhone',
            'agreementDate', 'batterySerialNumber',
            'priceFrom', 'priceTo',
            'registeredName', 'logBookNo'
        ];

        const newErrors = {};
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            toast.success("Sale Authority saved successfully!");
            console.log("Form data:", formData);
        } else {
            toast.error("Please fill in all required fields.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-4 sm:px-10">
            <div className="mx-auto bg-white rounded-2xl shadow-2xl p-10">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10 uppercase tracking-wider">
                    Sale Authority Form
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Current Owner */}
                    <Section title="Current Owner">
                        <TextInput label="Name" name="ownerName" value={formData.ownerName} onChange={handleChange} error={errors.ownerName} />
                        <TextInput label="ID Number" name="ownerId" value={formData.ownerId} onChange={handleChange} error={errors.ownerId} />
                        <TextInput label="Phone" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} error={errors.ownerPhone} />
                    </Section>

                    {/* Delivered By */}
                    <Section title="Delivered By">
                        <TextInput label="Name" name="deliveredByName" value={formData.deliveredByName} onChange={handleChange} error={errors.deliveredByName} />
                        <TextInput label="ID Number" name="deliveredById" value={formData.deliveredById} onChange={handleChange} error={errors.deliveredById} />
                        <TextInput label="Phone" name="deliveredByPhone" value={formData.deliveredByPhone} onChange={handleChange} error={errors.deliveredByPhone} />
                    </Section>

                    {/* Received By */}
                    <Section title="Received By">
                        <TextInput label="Name" name="receivedByName" value={formData.receivedByName} onChange={handleChange} error={errors.receivedByName} />
                        <TextInput label="ID Number" name="receivedById" value={formData.receivedById} onChange={handleChange} error={errors.receivedById} />
                        <TextInput label="Phone" name="receivedByPhone" value={formData.receivedByPhone} onChange={handleChange} error={errors.receivedByPhone} />
                    </Section>

                    {/* Agreement Info */}
                    <Section title="Agreement Information">
                        <TextInput label="Date of Agreement" name="agreementDate" value={formData.agreementDate} onChange={handleChange} error={errors.agreementDate} />
                        <TextInput label="Battery Serial Number" name="batterySerialNumber" value={formData.batterySerialNumber} onChange={handleChange} error={errors.batterySerialNumber} />
                        <TextInput label="Price Range From" name="priceFrom" value={formData.priceFrom} onChange={handleChange} error={errors.priceFrom} />
                        <TextInput label="Price Range To" name="priceTo" value={formData.priceTo} onChange={handleChange} error={errors.priceTo} />
                        <TextInput label="Commission Percentage" name="commissionPercentage" value={formData.commissionPercentage} onChange={handleChange} />
                        <TextInput label="Commission Amount" name="commissionAmount" value={formData.commissionAmount} onChange={handleChange} />
                        <TextInput label="Registered Name" name="registeredName" value={formData.registeredName} onChange={handleChange} error={errors.registeredName} />
                        <TextInput label="Log Book Number" name="logBookNo" value={formData.logBookNo} onChange={handleChange} error={errors.logBookNo} />
                        <TextInput label="General Remark" name="generalRemark" value={formData.generalRemark} onChange={handleChange} />
                    </Section>

                    <SubmitButton />
                </form>
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default SaleAuthorityForm;

const Section = ({ title, children }) => (
    <section className="mb-10">
        <h3 className="text-xl font-bold mb-4 text-gray-700">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children}
        </div>
    </section>
);
