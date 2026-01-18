import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

interface BookingConfirmation {
  id: string;
  confirmationNumber: string;
  status: string;
  propertyName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  contactName: string;
  contactEmail: string;
}

export default function BookingConfirmationPage() {
  const router = useRouter();
  const { booking } = router.query;
  const [confirmationDetails, setConfirmationDetails] = useState<BookingConfirmation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you'd fetch booking details from the API
    // For now, we'll use mock data based on the booking ID
    const fetchBookingDetails = async () => {
      if (!booking) return;

      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock booking details - in real app, fetch from API
        const mockDetails: BookingConfirmation = {
          id: booking as string,
          confirmationNumber: `CONF-${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
          status: 'confirmed',
          propertyName: 'Villa Ocean Breeze',
          checkInDate: '2024-02-15',
          checkOutDate: '2024-02-18',
          guests: 4,
          totalPrice: 2865,
          contactName: 'John Doe',
          contactEmail: 'john.doe@example.com'
        };

        setConfirmationDetails(mockDetails);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setError("Failed to load booking confirmation details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [booking]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading confirmation details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !confirmationDetails) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error || "Booking confirmation not found"}
          </div>
          <Link 
            href="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl">
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 sm:p-7 text-center">
          <div className="mb-4 sm:mb-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-sm sm:text-base text-green-50">Your reservation has been successfully confirmed</p>
        </div>

        {/* Confirmation Details */}
        <div className="p-5 sm:p-7">
          <div className="text-center mb-5 sm:mb-7 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              Confirmation Number
            </h2>
            <p className="text-xl sm:text-3xl font-bold text-blue-700 bg-white inline-block px-5 sm:px-6 py-3 rounded-lg shadow-md break-all sm:break-normal border-2 border-blue-200">
              {confirmationDetails.confirmationNumber}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-3 font-medium">
              Please save this confirmation number for your records
            </p>
          </div>

          {/* Booking Details */}
          <div className="border-t border-gray-200 pt-5 sm:pt-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Booking Details</h3>
            <div className="space-y-3 sm:space-y-3.5 bg-gray-50 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 py-2 border-b border-gray-200 last:border-0">
                <span className="text-sm sm:text-base text-gray-600 font-medium">Property:</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900 text-right">{confirmationDetails.propertyName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 py-2 border-b border-gray-200 last:border-0">
                <span className="text-sm sm:text-base text-gray-600 font-medium">Check-in:</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900 text-right">{formatDate(confirmationDetails.checkInDate)}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 py-2 border-b border-gray-200 last:border-0">
                <span className="text-sm sm:text-base text-gray-600 font-medium">Check-out:</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900 text-right">{formatDate(confirmationDetails.checkOutDate)}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 py-2 border-b border-gray-200 last:border-0">
                <span className="text-sm sm:text-base text-gray-600 font-medium">Guests:</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900 text-right">{confirmationDetails.guests}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 py-2 border-b border-gray-200 last:border-0">
                <span className="text-sm sm:text-base text-gray-600 font-medium">Total Paid:</span>
                <span className="text-base sm:text-lg font-bold text-green-600 text-right">${confirmationDetails.totalPrice}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 py-2">
                <span className="text-sm sm:text-base text-gray-600 font-medium">Status:</span>
                <span className="text-sm sm:text-base font-semibold text-green-600 capitalize text-right bg-green-50 px-3 py-1 rounded-full inline-block">
                  {confirmationDetails.status}
                </span>
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="border-t border-gray-200 pt-5 sm:pt-6 mt-5 sm:mt-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Guest Information</h3>
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 py-2 border-b border-gray-200 last:border-0">
                <span className="text-sm sm:text-base text-gray-600 font-medium">Name:</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900 text-right">{confirmationDetails.contactName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 py-2">
                <span className="text-sm sm:text-base text-gray-600 font-medium">Email:</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900 text-right break-all sm:break-normal">{confirmationDetails.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="border-t border-gray-200 pt-5 sm:pt-6 mt-5 sm:mt-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">What's Next?</h3>
            <ul className="space-y-3 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">A confirmation email has been sent to {confirmationDetails.contactEmail}</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">The property host will contact you with check-in instructions</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Please arrive at the property on your check-in date</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Contact support if you need to make any changes</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={() => window.print()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 font-semibold py-3 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Print Confirmation
            </button>
            <Link 
              href="/"
              className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-5 rounded-lg text-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
