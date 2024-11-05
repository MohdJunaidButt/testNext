import { Place } from './places';

export enum PropertyType {
  Condo = 'Condo',
  House = 'House',
  // Add other property types as needed
}

export interface Image {
  id: number;
  url: string;
  filename: string;
}

export interface Property {
  id: number;
  info: string;
  is_active: boolean;
  created_on: string;
  updated_on: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  created_on: string;
  updated_on: string;
}

export interface CondoDetails {
  sale_price_from: string;
  sale_price_to: string;
  total_floors: number;
  available_floors: number;
  id: number;
  title: string;
  address: string;
  price: string;
  listing_no: string;
  publish_date: string;
  description: string;
  size: string;
  tax: string;
  building_type: string;
  completion: string;
  parking: string;
  development_status: string;
  days_on_market: string;
  data_source: string;
  locker_price: string;
  scale: string;
  sale_status: string;
  main_image: string;
  created_on: string;
  updated_on: string;
}

export interface SingleCondoPropertyDetails {
  id?: number;
  selling_category: string;
  latitude: string;
  longitude: string;
  building_maint_fee: string;
  last_updated_date: string;
  development_status: string;
  est_property_tax: string;
  listing_type: string;
  project_development_name: string;
  total_floor_plans: string;
  available_plans_dynamic: string;
  project_title: string;
  slug: string;
  meta_description: string;
  'development_logo url': string;
  intersection: string;
  address: string;
  neighbourhood: string;
  city: string;
  postal_code: string;
  district: string;
  developer: string;
  'building_images url': string;
  'featured_building image url': string;
  'floor_plans location url': string;
  description: string;
  ceilings: string;
  selling_status: string;
  sales_started: string;
  construction_status: string;
  'construction_start date': string;
  occupancy: string;
  'no_of stories': string;
  'no._of units': string;
  'unit_size from (sq.ft)': string;
  'unit_size up to (sq.ft)': string;
  amenities: string;
  current_incentives: string;
  architects: string;
  interior_designers: string;
  marketing_company: string;
  sales_company: string;
  sales_price_from: string;
  sales_price_to: string;
  price___sq_ft_from: string;
  price___sq_ft_to: string;
  neighbourhood_avg_ppf: string;
  city_average_ppf: string;
  'price_/ sq ft to': string;
  'building_maint. fee': string;
  parking_cost: string;
  'parking_maint. fee': string;
  locker_cost: string;
  'locker_maint fee': string;
  'bicycle_locker cost': string;
  'bicycle_locker maint fee': string;
  deposit_structure: string;
  'co-op_fee realtors': string;
  'est._property tax': string;
  'sales_office location': string;
  'sales_office phone': string;
  'sales_office email': string;
  'last_updated date': string;
  'do_we follow buzzbuzz': string;
  province_name: string;
  'developer_logo url': string;
  tags: string;
  keyword: string;
  agent1: string;
  agent2: string;
  agent3: string;
  agent4: string;
  video: string;
  end_column: string;
  'data_added ': string;
  bedroom_from: string;
  bedroom_to: string;
  bedroom_types: string;
  talkcondo: string;
  'talkcondo_-date': string;
  'height_rank (city)': string;
  'height_rank (neighbourhood)': string;
  'total_floor plans': string;
  pdf_files: string;
  complete_package_url: string;
  walk_score: string;
  transit_score: string;
  height_m: string;
  height_ft: string;
}

export interface Developers {
  id: number;
  name: string;
  slug: string;
}

export interface FloorPlan {
  id: number;
  name: string;
  price: number;
  total_price: number;
  price_per_sqft: number;
  status: boolean;
  image: string;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  exposure: string;
  floor_range_from: number;
  floor_range_to: number;
  interior_size: number;
  property_id: number;
  condo_title: string;
  maintenance_fee_per_month: number;
}

export interface CondosProps {
  condos?: {
    id: number;
    featured_building_images: Image[];
    posted_on: string;
    property_type: PropertyType;
    property_id: number;
    house_id: string;
    condo_id: number;
    label_id: string;
    category_id: 2;
    created_on: string;
    updated_on: string;
    house: string;
    address: string;
    condo: CondoDetails;
    category: Category;
    label: string;
    property: Property;
  }[];
}

export interface PreConstructionProps {
  comingSoonPropertiesData?: {
    id: number;
    featured_building_images: Image[];
    posted_on: string;
    property_type: PropertyType;
    property_id: number;
    house_id: string;
    condo_id: number;
    label_id: string;
    category_id: 2;
    created_on: string;
    updated_on: string;
    house: string;
    address: string;
    condo: CondoDetails;
    category: Category;
    label: string;
    property: Property;
  }[];
}

export interface SingleCondo {
  condo?: {
    building_images: Image[];
    featured_building_images: Image[];
    id: string;
    info: string;
    is_active: boolean;
    created_on: string;
    updated_on: string;
    type: Category;
    attachments: string[];
    property_id: number;
    property_details: { [key: string]: string };
    floor_plans: FloorPlan[];
    developers: Developers[];
    is_invalid_floor_plans: boolean;
    condo: {
      id?: string;
      available_floors: string;
      sale_status: string;
      development_status?: string;
      title: string;
      price?: any;
      description?: string;
      publish_date: string;
    };
    house?: {
      id?: string;
      available_floors: string;
      sale_status: string;
      development_status?: string;
      title: string;
      price?: any;
      description?: string;
      publish_date: string;
    };
    places: Place[];
  };
}
