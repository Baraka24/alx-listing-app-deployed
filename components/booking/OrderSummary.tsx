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
    <div className="bg-white p-5 sm:p-6 shadow-lg border border-gray-200 rounded-xl sticky top-4 lg:top-6 mb-6 lg:mb-0 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-200">Review Order Details</h2>
      
      {/* Property Details */}
      <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-lg border border-gray-100">
        <img 
          src={bookingDetails.propertyImage} 
          alt={bookingDetails.propertyName} 
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0 shadow-sm"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/96x96?text=Property';
          }}
        />
        <div className="ml-3 sm:ml-4 flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {bookingDetails.propertyName}
          </h3>
          <div className="flex items-center mb-1">
            <svg className="w-4 h-4 text-yellow-400 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {bookingDetails.rating}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            {bookingDetails.guests} guest{bookingDetails.guests !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Booking Dates */}
      <div className="border-t border-b border-gray-200 py-4 mb-4 bg-gray-50 rounded-lg px-3 py-3">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div>
            <p className="font-semibold text-gray-700 mb-1 text-xs">Check-in</p>
            <p className="text-gray-900 break-words font-medium">{formatDate(bookingDetails.checkInDate)}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1 text-xs">Check-out</p>
            <p className="text-gray-900 break-words font-medium">{formatDate(bookingDetails.checkOutDate)}</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs sm:text-sm font-semibold text-gray-800">
            Total: {bookingDetails.totalNights} night{bookingDetails.totalNights !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs sm:text-sm py-2 border-b border-gray-100">
          <p className="text-gray-600 break-words pr-2">
            ${bookingDetails.price / bookingDetails.totalNights} × {bookingDetails.totalNights} night{bookingDetails.totalNights !== 1 ? 's' : ''}
          </p>
          <p className="font-semibold text-gray-900 whitespace-nowrap">${bookingDetails.price}</p>
        </div>
        
        <div className="flex justify-between items-center text-xs sm:text-sm py-2 border-b border-gray-100">
          <p className="text-gray-600">Booking Fee</p>
          <p className="font-semibold text-gray-900">${bookingDetails.bookingFee}</p>
        </div>
        
        <div className="border-t-2 border-gray-300 pt-3 mt-2">
          <div className="flex justify-between items-center">
            <p className="text-base sm:text-lg font-bold text-gray-900">Total</p>
            <p className="text-base sm:text-lg font-bold text-blue-600">${bookingDetails.totalPrice}</p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-5 p-3 sm:p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold text-blue-900">Note:</span> You will be charged the total amount upon confirmation. 
          Cancellation policies apply as per the property's terms.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;