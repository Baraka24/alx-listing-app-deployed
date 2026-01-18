import { NextApiRequest, NextApiResponse } from 'next';
import { Review } from '@/interfaces';

// Mock reviews data - in a real app, this would come from a database
const mockReviews: Review[] = [
  {
    id: 'review-1',
    userId: 'user-1',
    userName: 'Sarah Johnson',
    userAvatar: '/images/user-1.jpg',
    rating: 5,
    comment: 'Amazing property! The location was perfect and the amenities exceeded our expectations. Will definitely book again!',
    date: '2024-01-15'
  },
  {
    id: 'review-2',
    userId: 'user-2',
    userName: 'Mike Chen',
    userAvatar: '/images/user-2.jpg',
    rating: 4,
    comment: 'Great stay overall. The property was clean and well-maintained. Only minor issue was the WiFi speed.',
    date: '2024-01-10'
  },
  {
    id: 'review-3',
    userId: 'user-3',
    userName: 'Emily Davis',
    userAvatar: '/images/user-3.jpg',
    rating: 5,
    comment: 'Absolutely loved this place! The host was very responsive and the check-in process was seamless.',
    date: '2024-01-08'
  },
  {
    id: 'review-4',
    userId: 'user-4',
    userName: 'James Wilson',
    userAvatar: '/images/user-4.jpg',
    rating: 4,
    comment: 'Solid choice for a weekend getaway. The property matched the photos and was in a great neighborhood.',
    date: '2024-01-05'
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Review[] | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Property ID is required' });
      }

      // In a real app, you would filter reviews by propertyId
      // For this mock, we'll return the same reviews for all properties
      const propertyReviews = mockReviews.map(review => ({
        ...review,
        id: `${id}-${review.id}` // Make IDs unique per property
      }));

      res.status(200).json(propertyReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
