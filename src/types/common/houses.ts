import {
  Category,
  FloorPlan,
  Image,
  SingleCondoPropertyDetails,
} from '@/types/common/condos';

export interface HousesProps {
  houses?: {
    id: number;
    title: string;
    address: string;
    price: string;
    listing_no: string;
    publish_date: string;
    description: string;
    size: string;
    tax: string;
    property_type: string;
    age: string;
    parking: string;
    basement: string;
    days_on_market: string;
    data_source: string;
    main_image: any;
    created_on: string;
    updated_on: string;
  }[];
}

export interface SingleHouse {
  house?: {
    building_images: Image[];
    featured_building_images: Image[];
    is_images_complete: boolean;
    id: number;
    info: string;
    is_active: boolean;
    created_on: string;
    updated_on: string;
    type: Category;
    attachments: string[];
    property_id: number;
    property_details: { [key: string]: string };
    floor_plans: {
      data: FloorPlan[];
    };
    developers: Array<{ id: number; name: string; slug: string }> | [];
    rooms: {
      data: any[];
    };
  };
}
