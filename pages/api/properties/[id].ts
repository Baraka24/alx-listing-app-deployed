import { NextApiRequest, NextApiResponse } from 'next';
import { PropertyProps } from '@/interfaces';
import { PROPERTYLISTINGSAMPLE } from '@/constants';

// Mock data - in a real app, this would come from a database
const properties: PropertyProps[] = PROPERTYLISTINGSAMPLE.map((property, index) => ({
  ...property,
  id: property.id || `property-${index + 1}`, // Use existing ID or generate one
  description: `Experience the ultimate in luxury and comfort at ${property.name}. This stunning property offers breathtaking views and premium amenities for an unforgettable stay.`,
  amenities: [...property.category, 'High-speed internet', 'Air conditioning', 'Heating'],
  host: {
    name: 'John Doe',
    avatar: '/images/host-avatar.jpg',
    verified: true,
  },
}));

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PropertyProps | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Property ID is required' });
      }

      const property = properties.find(p => p.id === id);

      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      res.status(200).json(property);
    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
