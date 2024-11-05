import { IBuildingImage } from '@/types/store/listing';

export interface IHomeSearch {
  cities: Array<string>;
  addresses: Array<string>;
  searchTitles: Array<string>;
  propertiesCount: number;
  properties: Array<IGlobalSearchProperty>;
}

export interface IGlobalSearchProperty {
  id: number;
  posted_on: Date;
  property_type: string;
  property_id: number;
  created_on: Date;
  updated_on: Date;
  property_details: PropertyDetails;
  featured_building_images: IBuildingImage[];
}

interface PropertyDetails {
  listing_type: string;
  selling_status: string;
  construction_status: string;
  project_development_name: string;
  project_title: string;
  slug: string;
  no_of_stories: string;
  sales_price_from: string;
  bedroom_to: string;
  bedroom_from: string;
  sales_price_to: string;
  address: string;
  city: string;
}
