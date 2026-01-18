import { useState, useEffect } from 'react';
import { PropertyProps, Review, BookingDetails, BookingResponse } from '@/interfaces';
import { 
  fetchProperties, 
  fetchPropertyById, 
  fetchPropertyReviews, 
  submitBooking,
  handleApiError 
} from '@/services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Hook for fetching properties list
export function useProperties(filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}) {
  const [state, setState] = useState<UseApiState<PropertyProps[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const loadProperties = async () => {
      try {
        setState((prev: UseApiState<PropertyProps[]>) => ({ ...prev, loading: true, error: null }));
        const properties = await fetchProperties(filters);
        
        if (isMounted) {
          setState({ data: properties, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: handleApiError(error),
          });
        }
      }
    };

    loadProperties();

    return () => {
      isMounted = false;
    };
  }, [filters?.category, filters?.minPrice, filters?.maxPrice, filters?.location]);

  return state;
}

// Hook for fetching a single property
export function useProperty(id: string | undefined) {
  const [state, setState] = useState<UseApiState<PropertyProps>>({
    data: null,
    loading: !!id,
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let isMounted = true;

    const loadProperty = async () => {
      try {
        setState((prev: UseApiState<PropertyProps>) => ({ ...prev, loading: true, error: null }));
        const property = await fetchPropertyById(id);
        
        if (isMounted) {
          setState({ data: property, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: handleApiError(error),
          });
        }
      }
    };

    loadProperty();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return state;
}

// Hook for fetching property reviews
export function usePropertyReviews(propertyId: string | undefined) {
  const [state, setState] = useState<UseApiState<Review[]>>({
    data: null,
    loading: !!propertyId,
    error: null,
  });

  useEffect(() => {
    if (!propertyId) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let isMounted = true;

    const loadReviews = async () => {
      try {
        setState((prev: UseApiState<Review[]>) => ({ ...prev, loading: true, error: null }));
        const reviews = await fetchPropertyReviews(propertyId);
        
        if (isMounted) {
          setState({ data: reviews, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: handleApiError(error),
          });
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, [propertyId]);

  return state;
}

// Hook for booking submission
export function useBooking() {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
    bookingResponse: BookingResponse | null;
  }>({
    loading: false,
    error: null,
    success: false,
    bookingResponse: null,
  });

  const submitBookingRequest = async (bookingDetails: BookingDetails) => {
    try {
      setState({
        loading: true,
        error: null,
        success: false,
        bookingResponse: null,
      });

      const response = await submitBooking(bookingDetails);
      
      setState({
        loading: false,
        error: null,
        success: true,
        bookingResponse: response,
      });

      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      setState({
        loading: false,
        error: errorMessage,
        success: false,
        bookingResponse: null,
      });
      throw error;
    }
  };

  const resetBookingState = () => {
    setState({
      loading: false,
      error: null,
      success: false,
      bookingResponse: null,
    });
  };

  return {
    ...state,
    submitBooking: submitBookingRequest,
    resetBookingState,
  };
}
