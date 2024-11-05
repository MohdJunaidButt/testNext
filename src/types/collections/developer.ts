import { IListing } from '@/types/store/listing';

export interface DeveloperBasic {
  id: number;
  created_on: Date;
  updated_on: Date;
  name: string;
  slug: string;
  logo: string;
  pre_construction: number;
  selling: number;
  sold_out: number;
}

export interface IDeveloper {
  id: number;
  name: string;
  slug: string;
  logo: string;
  created_on: Date;
  updated_on: Date;
  total_properties: number;
  properties: IListing[];
  // most_popular: IListing[];
  // newly_listed: IListing[];
  pre_construction: IListing[];
  selling: IListing[];
  sold_out: IListing[];
}
