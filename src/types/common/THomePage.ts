// File: @/types/HomePage.types.ts

import { DeveloperBasic } from '@/types/collections/developer';
import { PropertySection } from '@/types/common/propertySection';
import { IWebsiteSection } from '@/types/common/websiteSection';

export enum PropertyType {
  CONDO = 'condo',
  HOUSE = 'house',
  // ... other property types ...
}

export enum ListingType {
  SALE = 'Sale',
  LEASE = 'Lease',
  ASSIGNMENT = 'Assignment',
  // ... other listing types ...
}

// ... other enums as needed ...

/**
 * Describes the details of a property.
 */
export interface PropertyDetails {
  property_type: PropertyType;
  listing_type: ListingType;
  selling_status: string;
  // ... other fields from property_details ...
  intersection: string;
  neighbourhood: string;
  district: string;
  address: string;
  city: string;
  province_name: string;
  postal_code: string;
  developer: string;
  developer_logo_url?: string; // assuming this can be optional
  // ... and so on for all fields in property_details ...
}

export interface Condo {
  id: number;
  created_on: Date;
  updated_on: Date;
  title: string;
  address: string;
  price: string;
  sale_price_from: string;
  sale_price_to: string;
  total_floors: string;
  available_floors: string;
  listing_no: string;
  publish_date: Date;
  description: string;
  size: string;
  tax: null;
  building_type: null;
  completion: null;
  parking: null;
  development_status: null;
  days_on_market: null;
  data_source: null;
  locker_price: null;
  scale: null;
  sale_status: null;
  main_image: null;
  category: number;
  property: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  created_on: Date;
  updated_on: Date;
  parent_category: number;
}

export interface BuildingImage {
  id: number;
  url: string;
  filename: string;
}

export interface Property {
  id: number;
  info: string;
  is_active: boolean;
  created_on: Date;
  updated_on: Date;
  type: number;
}

export interface Type {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  created_on: Date;
  updated_on: Date;
}

/**
 * Represents a single property data entry.
 */
export interface PropertyData {
  id: number;
  posted_on: Date;
  type: Type;
  property_type: PropertyType;
  property_id: number;
  house_id: number | null;
  condo_id: number;
  label_id: number | null;
  category_id: number;
  created_on: Date;
  updated_on: Date;
  property_details: PropertyDetails;
  house?: any | null; // assuming House is a defined interface
  condo?: Condo;
  category: Category;
  label: null; // assuming Label is a defined interface
  property: Property;
  building_images: BuildingImage[];
  featured_building_images: BuildingImage[];
}

export interface CombinedPropertiesStats {
  totalCombinedProperties: number;
  totalCombinedPropertiesThisMonth: number;
  totalCombinedPropertiesThisYear: number;
  totalCondos: number;
  totalHouses: number;
}

/**
 * Describes the response structure for properties data.
 */
export interface PropertiesResponse {
  totalResults: number;
  combinedPropertiesStats: CombinedPropertiesStats;
  filtered_results_count: number;
  data: PropertyData[];
}

/**
 * Represents the properties required for the HomePage component.
 */
export interface HomePageProps {
  comingSoonPropertiesData: PropertiesResponse;
  torontoPropertiesData: any;
  mapData: any;
  cities: Array<{ id: number; label: string; value: string }>;
  propertySections: Array<PropertySection>;
  isApiDown?: boolean;
  websiteSections?: Array<IWebsiteSection>;
}
