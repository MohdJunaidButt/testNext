export interface Place {
  id: number;
  name: string;
  display_name: string;
  types: string[];
  formattedAddress: string;
  latitude: number;
  longitude: number;
  adrFormatAddress: string;
  primary_type: string;
  shortFormattedAddress: string;
  photos: Photo[];
}

export interface Photo {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: AuthorAttribution[];
}

export interface AuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
}
