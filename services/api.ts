import { PropertyProps, Review, BookingDetails, BookingResponse } from '@/interfaces';

const API_BASE_URL = typeof window !== 'undefined' 
  ? window.location.origin + '/api' 
  : 'http://localhost:3000/api';

// Generic fetch wrapper with error handling
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// GET /properties — Fetches the list of properties for the listing page
export async function fetchProperties(filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}): Promise<PropertyProps[]> {
  const queryParams = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
  }
  
  const endpoint = `/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  return apiRequest<PropertyProps[]>(endpoint);
}

// GET /properties/:id — Fetches the details of a single property based on its ID
export async function fetchPropertyById(id: string): Promise<PropertyProps> {
  return apiRequest<PropertyProps>(`/properties/${id}`);
}

// POST /bookings — Submits booking details to the server
export async function submitBooking(bookingDetails: BookingDetails): Promise<BookingResponse> {
  return apiRequest<BookingResponse>('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingDetails),
  });
}

// GET /properties/:id/reviews — Fetches the reviews of a property
export async function fetchPropertyReviews(propertyId: string): Promise<Review[]> {
  return apiRequest<Review[]>(`/properties/${propertyId}/reviews`);
}

// Helper function to handle API errors
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
