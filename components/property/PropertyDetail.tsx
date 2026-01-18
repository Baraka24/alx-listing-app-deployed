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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{property.address.city}, {property.address.state}, {property.address.country}</span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">{property.rating.toFixed(1)}</span>
            <span className="text-gray-500 ml-1">(Reviews)</span>
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
            className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-1 gap-2">
          {propertyImages.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${property.name} ${index + 1}`}
              className={`w-full h-20 lg:h-24 object-cover rounded-lg cursor-pointer transition-opacity ${
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Features</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                <div className="font-semibold">{property.offers.bed}</div>
                <div className="text-sm text-gray-600">Bedroom{property.offers.bed !== '1' ? 's' : ''}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                <div className="font-semibold">{property.offers.shower}</div>
                <div className="text-sm text-gray-600">Bathroom{property.offers.shower !== '1' ? 's' : ''}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="font-semibold">{property.offers.occupants}</div>
                <div className="text-sm text-gray-600">Guests</div>
              </div>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
          )}

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 gap-3">
              {(property.amenities || property.category).map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{amenity}</span>
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
          <div className="sticky top-8 border rounded-lg p-6 shadow-lg">
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">${property.price}</span>
                <span className="text-gray-600 ml-1">/ night</span>
              </div>
              <div className="flex items-center mt-2">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">{property.rating.toFixed(1)}</span>
                <span className="text-gray-500 ml-1">(Reviews)</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded-lg p-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">CHECK-IN</label>
                  <input 
                    type="date" 
                    className="w-full text-sm border-0 p-0 focus:ring-0"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="border rounded-lg p-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">CHECK-OUT</label>
                  <input 
                    type="date" 
                    className="w-full text-sm border-0 p-0 focus:ring-0"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div className="border rounded-lg p-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">GUESTS</label>
                <select className="w-full text-sm border-0 p-0 focus:ring-0">
                  {Array.from({ length: parseInt(property.offers.occupants.split('-')[1] || property.offers.occupants) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} guest{i > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-200 mb-4">
              Reserve
            </button>

            <p className="text-center text-gray-600 text-sm mb-4">
              You won't be charged yet
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">${property.price} x 5 nights</span>
                <span>${property.price * 5}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cleaning fee</span>
                <span>$50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service fee</span>
                <span>$75</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${property.price * 5 + 125}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
