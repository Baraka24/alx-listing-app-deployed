import React from 'react';
import Image from 'next/image';
import type { PropertyProps } from '@/interfaces';

interface CardProps {
  property: PropertyProps;
}

const Card: React.FC<CardProps> = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-image-container">
        <Image 
          src={property.image} 
          alt={property.name}
          className="property-image"
          width={400}
          height={250}
          style={{ objectFit: 'cover' }}
        />
        {property.discount && (
          <span className="discount-badge">{property.discount}% OFF</span>
        )}
      </div>
      
      <div className="property-info">
        <div className="property-header">
          <h3 className="property-name">{property.name}</h3>
          <div className="property-rating">
            <span className="rating-star">★</span>
            <span className="rating-value">{property.rating}</span>
          </div>
        </div>
        
        <p className="property-location">
          {property.address.city}, {property.address.country}
        </p>
        
        <div className="property-footer">
          <div className="property-price">
            <span className="price-amount">${property.price}</span>
            <span className="price-period">/night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
