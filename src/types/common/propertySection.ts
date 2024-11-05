export interface PropertySection {
  id: number;
  name: string;
  sequence_order: string;
  properties: Property[];
}

export interface Property {
  id: number;
  posted_on: Date;
  property_type: string;
  property_id: number;
  created_on: Date;
  updated_on: Date;
  is_hotproject: boolean;
  type: Type;
  property_details: PropertyDetails;
  featured_building_images: FeaturedBuildingImage[];
}

export interface FeaturedBuildingImage {
  id: number;
  url: string;
  filename: string;
}

export interface PropertyDetails {
  property_type: string;
  listing_type: string;
  selling_status: string;
  selling_category: string;
  construction_status: string;
  project_development_name: string;
  project_title: string;
  slug: string;
  address: string;
  city: string;
  bedroom_from: string;
  bedroom_to: string;
  total_floor_plans: string;
  available_plans_dynamic: string;
  no_of_stories: string;
  sales_price_from: string;
  sales_price_to: string;
  longitude: string;
  latitude: string;
}

export interface Type {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  created_on: Date;
  updated_on: Date;
}
