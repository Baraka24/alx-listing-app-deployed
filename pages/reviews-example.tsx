import React from 'react';
import ReviewSection from '@/components/property/ReviewSection';

const ReviewsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Property Reviews Example</h1>
      
      {/* Example usage with property-1 */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews for Property 1</h2>
        <ReviewSection 
          propertyId="property-1"
          maxReviews={3}
          className="bg-white rounded-lg shadow-md p-6"
        />
      </div>

      {/* Example usage with property-2 */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews for Property 2</h2>
        <ReviewSection 
          propertyId="property-2"
          showTitle={false}
          className="bg-gray-50 rounded-lg p-6"
        />
      </div>

      {/* Example usage with all reviews */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Reviews for Property 3</h2>
        <ReviewSection 
          propertyId="property-3"
          className="border-2 border-gray-200 rounded-lg p-6"
        />
      </div>
    </div>
  );
};

export default ReviewsPage;
