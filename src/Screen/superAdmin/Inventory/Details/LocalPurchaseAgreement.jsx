import React, { useState } from 'react';
import TextInput from '@/components/inputs/TextInput';
import SubmitButton from '@/components/button/submitButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LocalPurchaseAgreement = () => {
    const [formData, setFormData] = useState({
        sellerName: '',
        sellerId: '',
        sellerAddress: '',
        sellerPhone: '',
        ownerName: '',
        ownerId: '',
        ownerPhone: '',
        kraPin: '',
        buyerName: '',
        buyerId: '',
        buyerAddress: '',
        buyerPhone: '',
        dateReceived: '',
        receivedBy: '',
        sellerWitnessName: '',
        sellerWitnessId: '',
        sellerWitnessPhone: '',
        buyerWitnessName: '',
        buyerWitnessId: '',
        buyerWitnessPhone: '',
        agreedPrice: '',
        amountPaid: '',
        balance: '',
        description: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            'sellerName', 'sellerId', 'sellerAddress', 'sellerPhone',
            'ownerName', 'ownerId', 'ownerPhone', 'kraPin',
            'buyerName', 'buyerId', 'buyerAddress', 'buyerPhone',
            'dateReceived', 'receivedBy',
            'sellerWitnessName', 'sellerWitnessId', 'sellerWitnessPhone',
            'buyerWitnessName', 'buyerWitnessId', 'buyerWitnessPhone',
            'agreedPrice', 'amountPaid', 'balance'
        ];

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
            toast.success("Form submitted successfully!");
            console.log("Submitted Data:", formData);
        } else {
            toast.error("Please correct the errors before submitting.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-4 sm:px-10">
            <div className="mx-auto bg-white rounded-2xl shadow-2xl p-10">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10 uppercase tracking-wider">
                    Local Purchase Form
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Seller's Details */}
                    <Section title="Seller's Details">
                        <TextInput label="Name" name="sellerName" value={formData.sellerName} onChange={handleChange} error={errors.sellerName} />
                        <TextInput label="ID Number" name="sellerId" value={formData.sellerId} onChange={handleChange} error={errors.sellerId} />
                        <TextInput label="Address" name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} error={errors.sellerAddress} />
                        <TextInput label="Phone" name="sellerPhone" value={formData.sellerPhone} onChange={handleChange} error={errors.sellerPhone} />
                    </Section>

                    {/* Registered Owner */}
                    <Section title="Registered Owner">
                        <TextInput label="Name" name="ownerName" value={formData.ownerName} onChange={handleChange} error={errors.ownerName} />
                        <TextInput label="ID Number" name="ownerId" value={formData.ownerId} onChange={handleChange} error={errors.ownerId} />
                        <TextInput label="Phone" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} error={errors.ownerPhone} />
                        <TextInput label="KRA PIN" name="kraPin" value={formData.kraPin} onChange={handleChange} error={errors.kraPin} />
                    </Section>

                    {/* Buyer's Details */}
                    <Section title="Buyer's Details">
                        <TextInput label="Name" name="buyerName" value={formData.buyerName} onChange={handleChange} error={errors.buyerName} />
                        <TextInput label="ID Number" name="buyerId" value={formData.buyerId} onChange={handleChange} error={errors.buyerId} />
                        <TextInput label="Address" name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} error={errors.buyerAddress} />
                        <TextInput label="Phone" name="buyerPhone" value={formData.buyerPhone} onChange={handleChange} error={errors.buyerPhone} />
                    </Section>

                    {/* Other Details */}
                    <Section title="Other Details">
                        <TextInput label="Date Received" name="dateReceived" value={formData.dateReceived} onChange={handleChange} error={errors.dateReceived} />
                        <TextInput label="Received By" name="receivedBy" value={formData.receivedBy} onChange={handleChange} error={errors.receivedBy} />
                    </Section>

                    {/* Seller's Witness */}
                    <Section title="Seller's Witness">
                        <TextInput label="Name" name="sellerWitnessName" value={formData.sellerWitnessName} onChange={handleChange} error={errors.sellerWitnessName} />
                        <TextInput label="ID Number" name="sellerWitnessId" value={formData.sellerWitnessId} onChange={handleChange} error={errors.sellerWitnessId} />
                        <TextInput label="Phone" name="sellerWitnessPhone" value={formData.sellerWitnessPhone} onChange={handleChange} error={errors.sellerWitnessPhone} />
                    </Section>

                    {/* Buyer's Witness */}
                    <Section title="Buyer's Witness">
                        <TextInput label="Name" name="buyerWitnessName" value={formData.buyerWitnessName} onChange={handleChange} error={errors.buyerWitnessName} />
                        <TextInput label="ID Number" name="buyerWitnessId" value={formData.buyerWitnessId} onChange={handleChange} error={errors.buyerWitnessId} />
                        <TextInput label="Phone" name="buyerWitnessPhone" value={formData.buyerWitnessPhone} onChange={handleChange} error={errors.buyerWitnessPhone} />
                    </Section>

                    {/* Payment */}
                    <Section title="Payment Details">
                        <TextInput label="Agreed Price" name="agreedPrice" value={formData.agreedPrice} onChange={handleChange} error={errors.agreedPrice} />
                        <TextInput label="Amount Paid" name="amountPaid" value={formData.amountPaid} onChange={handleChange} error={errors.amountPaid} />
                        <TextInput label="Balance" name="balance" value={formData.balance} onChange={handleChange} error={errors.balance} />
                        <TextInput label="Description" name="description" value={formData.description} onChange={handleChange} />
                    </Section>

                    <SubmitButton />
                </form>
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default LocalPurchaseAgreement;

// Utility section component
const Section = ({ title, children }) => (
    <section className="mb-10">
        <h3 className="text-xl font-bold mb-4 text-gray-700">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children}
        </div>
    </section>
);
