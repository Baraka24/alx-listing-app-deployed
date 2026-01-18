export interface Address {
  state: string;
  city: string;
  country: string;
}

export interface Offers {
  bed: string;
  shower: string;
  occupants: string;
}

export interface PropertyProps {
  id?: string;
  name: string;
  address: Address;
  rating: number;
  category: string[];
  price: number;
  offers: Offers;
  image: string;
  discount: string;
  description?: string;
  amenities?: string[];
  host?: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BookingDetails {
  propertyId: string;
  userId?: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
}

export interface BookingResponse {
  id: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDetails: BookingDetails;
  confirmationNumber: string;
}
