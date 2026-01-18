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
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Success Header */}
        <div className="bg-green-500 text-white p-6 text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-green-100">Your reservation has been successfully confirmed</p>
        </div>

        {/* Confirmation Details */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Confirmation Number
            </h2>
            <p className="text-2xl font-bold text-blue-600 bg-blue-50 inline-block px-4 py-2 rounded">
              {confirmationDetails.confirmationNumber}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Please save this confirmation number for your records
            </p>
          </div>

          {/* Booking Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Property:</span>
                <span className="font-medium">{confirmationDetails.propertyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-medium">{formatDate(confirmationDetails.checkInDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-medium">{formatDate(confirmationDetails.checkOutDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span className="font-medium">{confirmationDetails.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Paid:</span>
                <span className="font-bold text-lg">${confirmationDetails.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600 capitalize">
                  {confirmationDetails.status}
                </span>
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Guest Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{confirmationDetails.contactName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{confirmationDetails.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                A confirmation email has been sent to {confirmationDetails.contactEmail}
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                The property host will contact you with check-in instructions
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Please arrive at the property on your check-in date
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Contact support if you need to make any changes
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button 
              onClick={() => window.print()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition-colors duration-200"
            >
              Print Confirmation
            </button>
            <Link 
              href="/"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center transition-colors duration-200"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
