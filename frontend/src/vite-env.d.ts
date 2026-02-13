/// <reference types="vite/client" />

// Google Maps types (loaded via script tag when API key is provided)
declare namespace google {
  namespace maps {
    class Geocoder {
      geocode(
        request: { placeId?: string; location?: { lat: number; lng: number } },
        callback: (
          results: Array<{
            formatted_address: string;
            geometry: { location: { lat(): number; lng(): number } };
            address_components: Array<{ long_name: string; short_name: string; types: string[] }>;
          }> | null,
          status: string
        ) => void
      ): void;
    }
    namespace places {
      class AutocompleteService {
        getPlacePredictions(
          request: {
            input: string;
            componentRestrictions?: { country: string };
            types?: string[];
          },
          callback: (results: any[] | null, status: string) => void
        ): void;
      }
      const PlacesServiceStatus: { OK: string };
    }
  }
}
