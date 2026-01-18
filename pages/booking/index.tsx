import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import CancellationPolicy from "@/components/booking/CancellationPolicy";
import { PropertyProps, BookingDetails, BookingResponse } from "@/interfaces";

export default function BookingPage() {
  const router = useRouter();
  const { propertyId, checkIn, checkOut, guests } = router.query;
  
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState<string>("");

  // Calculate booking details
  const checkInDate = checkIn as string;
  const checkOutDate = checkOut as string;
  const numberOfGuests = parseInt(guests as string) || 1;
  
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const totalNights = calculateNights();
  const bookingFee = 65;
  const subtotal = property ? property.price * totalNights : 0;
  const totalPrice = subtotal + bookingFee;

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/properties/${propertyId}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setError("Failed to load property details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleBookingSubmit = async (formData: {
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
  }) => {
    if (!property || !propertyId) return;

    setBookingLoading(true);
    setError(null);

    try {
      const bookingDetails: BookingDetails = {
        propertyId: propertyId as string,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: numberOfGuests,
        totalPrice,
        contactInfo: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phoneNumber,
        },
        specialRequests: formData.specialRequests,
      };

      const response = await axios.post<BookingResponse>("/api/bookings", bookingDetails);
      
      setBookingSuccess(true);
      setConfirmationNumber(response.data.confirmationNumber);
      
      // Redirect to confirmation page after 3 seconds
      setTimeout(() => {
        router.push(`/booking/confirmation?booking=${response.data.id}`);
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting booking:", error);
      setError("Failed to submit booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !property) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button 
            onClick={() => router.back()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="mb-2">Your booking has been successfully submitted.</p>
            <p className="font-medium">Confirmation Number: {confirmationNumber}</p>
          </div>
          <p className="text-gray-600 mb-4">Redirecting to confirmation page...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  const bookingDetails = {
    propertyName: property?.name || "",
    propertyImage: property?.image || "",
    rating: property?.rating || 0,
    price: subtotal,
    bookingFee,
    totalNights,
    totalPrice,
    checkInDate,
    checkOutDate,
    guests: numberOfGuests,
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Complete Your Booking</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="order-2 lg:order-1">
          <BookingForm 
            onSubmit={handleBookingSubmit} 
            loading={bookingLoading}
            error={error}
          />
          <CancellationPolicy />
        </div>
        <div className="order-1 lg:order-2">
          <OrderSummary bookingDetails={bookingDetails} />
        </div>
      </div>
    </div>
  );
}

