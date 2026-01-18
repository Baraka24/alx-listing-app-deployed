import React from 'react';
import Image from 'next/image';
import type { PropertyProps } from '@/interfaces';

interface CardProps {
  property: PropertyProps;
}

const Card: React.FC<CardProps> = ({ property }) => {
  return (
    <div className="property-card bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      <div className="relative overflow-hidden">
        <Image 
          src={property.image} 
          alt={property.name}
          className="property-image w-full h-48 sm:h-56 object-cover transition-transform duration-300 hover:scale-105"
          width={400}
          height={250}
          style={{ objectFit: 'cover' }}
        />
        {property.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-lg">
            {property.discount}% OFF
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4 sm:p-5">
        <div className="property-header flex items-start justify-between mb-2">
          <h3 className="property-name text-base sm:text-lg font-bold text-gray-900 line-clamp-2 flex-1 pr-2 hover:text-blue-600 transition-colors duration-200">
            {property.name}
          </h3>
          <div className="property-rating flex items-center flex-shrink-0">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="rating-value text-xs sm:text-sm font-medium text-gray-900">{property.rating}</span>
          </div>
        </div>
        
        <p className="property-location text-xs sm:text-sm text-gray-600 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {property.address.city}, {property.address.country}
        </p>
        
        <div className="property-footer pt-3 border-t border-gray-100">
          <div className="property-price">
            <span className="price-amount text-xl sm:text-2xl font-bold text-gray-900">${property.price}</span>
            <span className="price-period text-xs sm:text-sm font-normal text-gray-500 ml-1">/ night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
