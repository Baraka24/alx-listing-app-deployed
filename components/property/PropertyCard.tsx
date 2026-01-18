import React from 'react';
import Link from 'next/link';
import { PropertyProps } from '@/interfaces';

interface PropertyCardProps {
  property: PropertyProps;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="property-card bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      {/* Property Image */}
      <div className="relative overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 hover:scale-105"
        />
        {property.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-lg">
            {property.discount}% OFF
          </div>
        )}
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Property Details */}
      <div className="p-4 sm:p-5">
        {/* Property Name */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
          {property.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-2">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs sm:text-sm truncate">
            {property.address.city}, {property.address.state}, {property.address.country}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              {property.rating}
            </span>
          </div>
        </div>

        {/* Property Features */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-3 flex-wrap gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span>{property.offers.bed} bed{property.offers.bed !== '1' ? 's' : ''}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              <span>{property.offers.shower} bath{property.offers.shower !== '1' ? 's' : ''}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{property.offers.occupants} guests</span>
            </div>
          </div>
        </div>

        {/* Categories/Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
          {property.category.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {property.category.length > 3 && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{property.category.length - 3} more
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2 pt-3 border-t border-gray-100">
          <div className="w-full sm:w-auto">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              ${property.price}
              <span className="text-xs sm:text-sm font-normal text-gray-500 ml-1">/ night</span>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link href={`/property/${property.id}`} className="flex-1 sm:flex-none">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                Details
              </button>
            </Link>
            <Link href={`/booking?propertyId=${property.id}&checkIn=${new Date().toISOString().split('T')[0]}&checkOut=${new Date(Date.now() + 86400000).toISOString().split('T')[0]}&guests=2`} className="flex-1 sm:flex-none">
              <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                Book
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
