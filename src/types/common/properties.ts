import { PropertyType } from '@/types/common/THomePage';

export interface FetchArgs {
  address?: string;
  city?: string;
  sales_price?: string;
  postal_code?: string;
  properties?: number[];
  agent?: string;
  construction_status?: string;
  title?: string;
  selling_category?: string;
  sale_status?: string;
  page?: number;
  limit?: number;
  unit_size?: string;
  selling_status?: string;
  bedroom_from?: string;
  bedroom_to?: string;
  price_per_sqft?: string;
  price___sq_ft?: string;
  price___sq_ft_from?: string;
  price___sq_ft_to?: string;
  occupancy?: string;
  sales_price_from?: string;
  sales_price_to?: string;
  bedroom?: string;
  type?: PropertyType;
  is_hotproject?: boolean;
  longitude?: string;
  latitude?: string;
}
