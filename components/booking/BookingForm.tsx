import React, { useState } from "react";

interface BookingFormProps {
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    billingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    specialRequests?: string;
  }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    specialRequests: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith("billing.")) {
      const billingField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [billingField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Required field validation
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
    if (!formData.cardNumber.trim()) errors.cardNumber = "Card number is required";
    if (!formData.expirationDate.trim()) errors.expirationDate = "Expiration date is required";
    if (!formData.cvv.trim()) errors.cvv = "CVV is required";
    if (!formData.billingAddress.street.trim()) errors["billing.street"] = "Street address is required";
    if (!formData.billingAddress.city.trim()) errors["billing.city"] = "City is required";
    if (!formData.billingAddress.state.trim()) errors["billing.state"] = "State is required";
    if (!formData.billingAddress.zipCode.trim()) errors["billing.zipCode"] = "Zip code is required";
    if (!formData.billingAddress.country.trim()) errors["billing.country"] = "Country is required";

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Card number validation (basic)
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Please enter a valid 16-digit card number";
    }

    // CVV validation
    if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
      errors.cvv = "Please enter a valid CVV";
    }

    // Phone validation (basic)
    if (formData.phoneNumber && !/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <div className="bg-white p-5 sm:p-6 shadow-lg border border-gray-200 rounded-xl">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-200">Contact Detail</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">First Name</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={loading}
            />
            {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
          </div>
          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={loading}
            />
            {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={loading}
            />
            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
          </div>
          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">Phone Number</label>
            <input 
              type="tel" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={loading}
            />
            {formErrors.phoneNumber && <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>}
          </div>
        </div>

        {/* Payment Information */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-6 mb-4 pt-4 border-t border-gray-200">Pay with</h2>
        <div>
          <label className="font-semibold text-gray-700 block mb-1.5">Card Number</label>
          <input 
            type="text" 
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors.cardNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            disabled={loading}
          />
          {formErrors.cardNumber && <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">Expiration Date</label>
            <input 
              type="text" 
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors.expirationDate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={loading}
            />
            {formErrors.expirationDate && <p className="text-red-500 text-sm mt-1">{formErrors.expirationDate}</p>}
          </div>
          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">CVV</label>
            <input 
              type="text" 
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={loading}
            />
            {formErrors.cvv && <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>}
          </div>
        </div>

        {/* Billing Address */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-6 mb-4 pt-4 border-t border-gray-200">Billing Address</h2>
        <div>
          <label className="font-semibold text-gray-700 block mb-1.5">Street Address</label>
          <input 
            type="text" 
            name="billing.street"
            value={formData.billingAddress.street}
            onChange={handleInputChange}
            className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors["billing.street"] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            disabled={loading}
          />
          {formErrors["billing.street"] && <p className="text-red-500 text-sm mt-1">{formErrors["billing.street"]}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">City</label>
            <input 
              type="text" 
              name="billing.city"
              value={formData.billingAddress.city}
              onChange={handleInputChange}
              className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors["billing.city"] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={loading}
            />
            {formErrors["billing.city"] && <p className="text-red-500 text-sm mt-1">{formErrors["billing.city"]}</p>}
          </div>
          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">State</label>
            <input 
              type="text" 
              name="billing.state"
              value={formData.billingAddress.state}
              onChange={handleInputChange}
              className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors["billing.state"] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={loading}
            />
            {formErrors["billing.state"] && <p className="text-red-500 text-sm mt-1">{formErrors["billing.state"]}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">Zip Code</label>
            <input 
              type="text" 
              name="billing.zipCode"
              value={formData.billingAddress.zipCode}
              onChange={handleInputChange}
              className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors["billing.zipCode"] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={loading}
            />
            {formErrors["billing.zipCode"] && <p className="text-red-500 text-sm mt-1">{formErrors["billing.zipCode"]}</p>}
          </div>
          <div>
            <label className="font-semibold text-gray-700 block mb-1.5">Country</label>
            <input 
              type="text" 
              name="billing.country"
              value={formData.billingAddress.country}
              onChange={handleInputChange}
              className={`border p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${formErrors["billing.country"] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              disabled={loading}
            />
            {formErrors["billing.country"] && <p className="text-red-500 text-sm mt-1">{formErrors["billing.country"]}</p>}
          </div>
        </div>

        {/* Special Requests */}
        <div className="mt-4">
          <label className="font-semibold text-gray-700 block mb-1.5">Special Requests (Optional)</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            rows={3}
            className="border border-gray-300 p-2.5 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            placeholder="Any special requests or notes for your stay..."
            disabled={loading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className={`mt-6 py-3.5 px-6 rounded-lg w-full font-semibold transition-all duration-200 shadow-md ${
            loading 
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed shadow-sm' 
              : 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            "Confirm & Pay"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;