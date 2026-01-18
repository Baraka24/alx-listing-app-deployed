import React, { useState } from 'react';
import { PropertyProps } from '@/interfaces';
import ReviewSection from './ReviewSection';

interface PropertyDetailProps {
  property: PropertyProps;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock additional images for gallery
  const propertyImages = [
    property.image,
    '/images/image 2.png',
    '/images/image 3.png',
    '/images/image 4.png'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
        <div className="flex items-center text-gray-600 mb-4 flex-wrap">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm sm:text-base">{property.address.city}, {property.address.state}, {property.address.country}</span>
        </div>
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">{property.rating.toFixed(1)}</span>
            <span className="text-gray-500 ml-1 text-sm">(Reviews)</span>
          </div>
          {property.discount && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
              {property.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Property Images */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <div className="lg:col-span-3">
          <img 
            src={propertyImages[selectedImageIndex]} 
            alt={property.name}
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-1 gap-2 order-first lg:order-last">
          {propertyImages.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${property.name} ${index + 1}`}
              className={`w-full h-16 sm:h-20 lg:h-24 object-cover rounded-lg cursor-pointer transition-opacity ${
                selectedImageIndex === index ? 'opacity-100 ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2">
          {/* Host Information */}
          {property.host && (
            <div className="mb-8 p-6 border rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                  {property.host.avatar ? (
                    <img src={property.host.avatar} alt={property.host.name} className="w-full h-full rounded-full" />
                  ) : (
                    <span className="text-gray-600 font-semibold">{property.host.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Hosted by {property.host.name}</h3>
                  {property.host.verified && (
                    <span className="text-sm text-green-600">✓ Verified Host</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Property Features */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Property Features</h2>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                <div className="font-semibold text-sm sm:text-base">{property.offers.bed}</div>
                <div className="text-xs sm:text-sm text-gray-600">Bedroom{property.offers.bed !== '1' ? 's' : ''}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                <div className="font-semibold text-sm sm:text-base">{property.offers.shower}</div>
                <div className="text-xs sm:text-sm text-gray-600">Bathroom{property.offers.shower !== '1' ? 's' : ''}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="font-semibold text-sm sm:text-base">{property.offers.occupants}</div>
                <div className="text-xs sm:text-sm text-gray-600">Guests</div>
              </div>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">About this place</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{property.description}</p>
            </div>
          )}

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">What this place offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(property.amenities || property.category).map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <ReviewSection 
            propertyId={property.id || ''}
            maxReviews={6}
            className="mb-8"
          />
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 lg:top-8 border border-gray-200 rounded-xl p-5 sm:p-6 shadow-xl mb-8 lg:mb-0 bg-white hover:shadow-2xl transition-shadow duration-300">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-baseline mb-2">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">${property.price}</span>
                <span className="text-gray-500 ml-1 text-sm sm:text-base">/ night</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-sm sm:text-base text-gray-900">{property.rating.toFixed(1)}</span>
                <span className="text-gray-500 ml-1 text-xs sm:text-sm">(Reviews)</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">CHECK-IN</label>
                  <input 
                    type="date" 
                    className="w-full text-xs sm:text-sm border-0 p-0 bg-transparent focus:ring-0 font-medium text-gray-900"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">CHECK-OUT</label>
                  <input 
                    type="date" 
                    className="w-full text-xs sm:text-sm border-0 p-0 bg-transparent focus:ring-0 font-medium text-gray-900"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">GUESTS</label>
                <select className="w-full text-xs sm:text-sm border-0 p-0 bg-transparent focus:ring-0 font-medium text-gray-900">
                  {Array.from({ length: parseInt(property.offers.occupants.split('-')[1] || property.offers.occupants) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} guest{i > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3.5 rounded-lg hover:from-pink-600 hover:to-red-600 active:from-pink-700 active:to-red-700 transition-all duration-200 mb-3 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Reserve
            </button>

            <p className="text-center text-gray-500 text-xs sm:text-sm mb-5 font-medium">
              You won't be charged yet
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm pt-4 border-t border-gray-200">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-600">${property.price} x 5 nights</span>
                <span className="font-semibold text-gray-900">${property.price * 5}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-600">Cleaning fee</span>
                <span className="font-semibold text-gray-900">$50</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-200">
                <span className="text-gray-600">Service fee</span>
                <span className="font-semibold text-gray-900">$75</span>
              </div>
              <div className="flex justify-between pt-2 mt-2">
                <span className="font-bold text-base sm:text-lg text-gray-900">Total</span>
                <span className="font-bold text-base sm:text-lg text-blue-600">${property.price * 5 + 125}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
