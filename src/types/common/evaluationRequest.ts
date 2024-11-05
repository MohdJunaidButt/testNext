import { PropertyType } from '@/types/common/THomePage';

export interface IEvaluationForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipcode: string;
  property_type: PropertyType;
  property_size: string;
  unit_number: string;
}
