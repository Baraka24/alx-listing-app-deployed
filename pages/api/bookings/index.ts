import { NextApiRequest, NextApiResponse } from 'next';
import { BookingDetails, BookingResponse } from '@/interfaces';

// Mock booking storage - in a real app, this would be a database
const bookings: BookingResponse[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookingResponse | { error: string }>
) {
  if (req.method === 'POST') {
    try {
      const bookingDetails: BookingDetails = req.body;

      // Basic validation
      if (!bookingDetails.propertyId || !bookingDetails.checkInDate || !bookingDetails.checkOutDate) {
        return res.status(400).json({ error: 'Missing required booking details' });
      }

      if (!bookingDetails.contactInfo?.name || !bookingDetails.contactInfo?.email) {
        return res.status(400).json({ error: 'Contact information is required' });
      }

      // Generate booking response
      const bookingResponse: BookingResponse = {
        id: `booking-${Date.now()}`,
        status: 'confirmed',
        bookingDetails,
        confirmationNumber: `CONF-${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
      };

      // Store the booking
      bookings.push(bookingResponse);

      res.status(201).json(bookingResponse);
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
