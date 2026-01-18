import React from 'react';

interface BookingDetailsProps {
  propertyName: string;
  propertyImage: string;
  rating: number;
  price: number;
  bookingFee: number;
  totalNights: number;
  totalPrice: number;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

const OrderSummary: React.FC<{ bookingDetails: BookingDetailsProps }> = ({ bookingDetails }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg sticky top-6">
      <h2 className="text-xl font-bold text-black mb-4">Review Order Details</h2>
      
      {/* Property Details */}
      <div className="flex items-center mb-6">
        <img 
          src={bookingDetails.propertyImage} 
          alt={bookingDetails.propertyName} 
          className="w-24 h-24 object-cover rounded-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/96x96?text=Property';
          }}
        />
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-black mb-1">
            {bookingDetails.propertyName}
          </h3>
          <div className="flex items-center mb-1">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              {bookingDetails.rating}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {bookingDetails.guests} guest{bookingDetails.guests !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Booking Dates */}
      <div className="border-t border-b py-4 mb-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700">Check-in</p>
            <p className="text-gray-900">{formatDate(bookingDetails.checkInDate)}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Check-out</p>
            <p className="text-gray-900">{formatDate(bookingDetails.checkOutDate)}</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700">
            Total: {bookingDetails.totalNights} night{bookingDetails.totalNights !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-gray-700">
            ${bookingDetails.price / bookingDetails.totalNights} × {bookingDetails.totalNights} night{bookingDetails.totalNights !== 1 ? 's' : ''}
          </p>
          <p className="font-medium text-gray-900">${bookingDetails.price}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Booking Fee</p>
          <p className="font-medium text-gray-900">${bookingDetails.bookingFee}</p>
        </div>
        
        <div className="border-t pt-2 mt-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-black">Total</p>
            <p className="text-lg font-bold text-black">${bookingDetails.totalPrice}</p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-3 bg-gray-50 rounded-md">
        <p className="text-xs text-gray-600">
          <span className="font-medium">Note:</span> You will be charged the total amount upon confirmation. 
          Cancellation policies apply as per the property's terms.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;