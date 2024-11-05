interface PropertyCondo {
  id: number;
  title: string;
  address: string;
  sale_price_from: number;
  sale_price_to: number;
  total_floors: number;
  available_floors: number;
  price: number;
  listing_no: string;
  publish_date: string;
  description: string;
  size: string;
  tax: string | null;
  building_type: string | null;
  completion: string | null;
  parking: string | null;
  development_status: string | null;
  days_on_market: number | null;
  data_source: string | null;
  locker_price: string | null;
  scale: string | null;
  sale_status: string;
  main_image: string | null;
  created_on: string;
  updated_on: string;
  category: number;
  property: number;
}

interface PropertyCategory {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  created_on: string;
  updated_on: string;
  parent_category: number;
}

interface BuildingImage {
  id: number;
  url: string;
  filename: string;
}

interface FeaturedBuildingImage {
  id: number;
  url: string;
  filename: string;
}
type PropertyDetails = {
  property_type: string;
  listing_type: string;
  selling_status: string;
  selling_category: string;
  construction_status: string;
  project_development_name: string;
  project_title: string;
  slug: string;
  meta_description: string;
  keyword: string;
  description: string;
  about_project: string;
  intersection: string;
  neighbourhood: string;
  district: string;
  address: string;
  city: string;
  province_name: string;
  postal_code: string;
  developer: string;
  developer_logo_url: string;
  '2nd_developer_logo_url': string;
  '3rd_developer_logo_url': string;
  development_logo_url: string;
  video: string;
  sales_started: string;
  construction_start_date: string;
  occupancy: string;
  bedroom_from: string;
  bedroom_to: string;
  bedroom_types: string;
  total_floor_plans: string;
  no_of_stories: string;
  no_of_units: string;
  unit_size_from_sqft: string;
  unit_size_up_to_sqft: string;
  ceilings: string;
  amenities: string;
  finishes: string;
  current_incentives: string;
  architects: string;
  interior_designers: string;
  marketing_company: string;
  sales_price_from: string;
  sales_price_to: string;
  price___sq_ft_from: string;
  price___sq_ft_to: string;
  neighbourhood_avg_ppf: string;
  city_average_ppf: string;
  building_maint_fee: string;
  parking_cost: string;
  parking_maint_fee: string;
  locker_cost: string;
  locker_maint_fee: string;
  deposit_structure: string;
  est_property_tax: string;
  percent_sold: string;
  walk_score: string;
  transit_score: string;
  height_m: string;
  height_ft: string;
  rebate: string;
  'rebate_%': string;
  tags: string;
  agent1: string;
  agent2: string;
  agent3: string;
  agent4: string;
  sales_company: string;
  floor_plans_location_url: string;
  building_type: string;
  estimated_completion: string;
  last_updated_date: string;
  bicycle_locker_cost: string;
  bicycle_locker_maint_fee: string;
  'co-op_fee_realtors': string;
  sales_office_location: string;
  sales_office_phone: string;
  sales_office_email: string;
  do_we_follow_buzzbuzz: string;
  sales_status: string;
  data_added: string;
  pdf_files: string;
  complete_package_url: string;
  available_plans_dynamic: string;
  latitude: string;
  longitude: string;
};

export interface PropertySummary {
  id: number;
  posted_on: string;
  property_type: string;
  property_id: number;
  house_id: null | number;
  condo_id: number;
  label_id: null | number;
  category_id: number;
  created_on: string;
  updated_on: string;
  property_details: PropertyDetails;
  house: null | string;
  condo: PropertyCondo;
  label: null | string;
  property: {
    id: number;
    info: string;
    is_active: boolean;
    created_on: string;
    updated_on: string;
    type: number;
  };
  building_images: BuildingImage[];
  featured_building_images: FeaturedBuildingImage[];
}

interface UserProfile {
  id: string;
  name: string;
  mobile_no: string;
  is_active: boolean;
  image_url: string;
  location: string;
  // Add other properties as needed
}

export interface User {
  id: string;
  email: string;
  description: string;
  code_2fa: null | string;
  created_at: string;
  created_by: null | string;
  hach_refresh_token: null | string;
  has_logged_in: boolean;
  is_active: boolean;
  is_banned: boolean;
  is_social_login: boolean;
  last_login: null | string;
  password: string;
  profile: UserProfile;
  city: string;
  experience: null | string;
  facebook_url: null | string;
  gender: string;
  image_url: string;
  instagram_url: null | string;
  location: null | string;
  mobile_no: string;
  name: string;
  receive_notifications_favourites: null | string;
  receive_notifications_listings: null | string;
  receive_notifications_sales: null | string;
  twitter_url: null | string;
  youtube_url: null | string;
  role: string;
  updated_at: string;
  updated_by: null | string;
}

export interface UserByID {
  total_properties: number;
  user: User;
  properties: [PropertySummary];
  // Add other properties as needed
}
