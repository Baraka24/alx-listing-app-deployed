import { NextApiRequest, NextApiResponse } from 'next';
import { PropertyProps } from '@/interfaces';
import { PROPERTYLISTINGSAMPLE } from '@/constants';

// Mock data - in a real app, this would come from a database
const properties: PropertyProps[] = PROPERTYLISTINGSAMPLE.map((property, index) => ({
  ...property,
  id: property.id || `property-${index + 1}`, // Use existing ID or generate one
}));

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PropertyProps[] | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      // Extract query parameters for filtering
      const { category, minPrice, maxPrice, location } = req.query;
      
      let filteredProperties = [...properties];

      // Apply filters
      if (category && typeof category === 'string') {
        filteredProperties = filteredProperties.filter(property =>
          property.category.some(cat => 
            cat.toLowerCase().includes(category.toLowerCase())
          )
        );
      }

      if (minPrice && typeof minPrice === 'string') {
        const min = parseFloat(minPrice);
        filteredProperties = filteredProperties.filter(property => 
          property.price >= min
        );
      }

      if (maxPrice && typeof maxPrice === 'string') {
        const max = parseFloat(maxPrice);
        filteredProperties = filteredProperties.filter(property => 
          property.price <= max
        );
      }

      if (location && typeof location === 'string') {
        filteredProperties = filteredProperties.filter(property =>
          property.address.city.toLowerCase().includes(location.toLowerCase()) ||
          property.address.state.toLowerCase().includes(location.toLowerCase()) ||
          property.address.country.toLowerCase().includes(location.toLowerCase())
        );
      }

      res.status(200).json(filteredProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
