import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pill from '@/components/common/Pill';
import PropertyCard from '@/components/property/PropertyCard';
import { PropertyProps } from '@/interfaces';
import { HERO_BACKGROUND_IMAGE, FILTER_LABELS } from '@/constants';

const Home: React.FC = () => {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on selected filter
  const filteredProperties = selectedFilter 
    ? properties.filter(property => 
        property.category.some(cat => 
          cat.toLowerCase().includes(selectedFilter.toLowerCase())
        )
      )
    : properties;

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(selectedFilter === filter ? null : filter);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Find your favorite place here!</h1>
            <p className="hero-subtitle">
              The best prices for over 2 million properties worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container">
          {FILTER_LABELS.map((label, index) => (
            <Pill 
              key={index} 
              label={label}
              isActive={selectedFilter === label}
              onClick={() => handleFilterClick(label)}
            />
          ))}
        </div>
      </section>

      {/* Listing Section */}
      <section className="listing-section">
        <div className="listing-container">
          {loading && (
            <div className="loading-container flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading properties...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="error-container flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
              {selectedFilter && (
                <div className="mb-4">
                  <p className="text-gray-600">
                    Showing {filteredProperties.length} properties for "{selectedFilter}"
                  </p>
                </div>
              )}
              
              {filteredProperties.length === 0 && !loading && (
                <div className="text-center py-8">
                  <p className="text-gray-600">No properties found matching your criteria.</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id || property.name} property={property} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;