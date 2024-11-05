// Common props in both house and condo
export interface IListingTypeBase {
    id: number;
    title: string;
    address: string;
    price: number | null;
    listing_no: string | null;
    publish_date: string | null;
    description: string | null;
    size: string | null;
    tax: string | null;
    days_on_market: number | null;
    main_image: string | null;
    created_on: string | null;
    updated_on: string | null;
    category: string | null;
    property: string | null;
    data_source: string | null;
  }
  
  // House type
  export interface IHouse extends IListingTypeBase {
    age: number | null;
    parking: string | null;
    basement: string | null;
    property_type: string | null;
  }
  
  // House type
  export interface ICondo extends IListingTypeBase {
    building_type: string | null;
    completion: string | null;
    development_status: string | null;
    locker_price: string | null;
    scale: string | null;
    sale_status: string | null;
    total_floors: number;
    available_floors: number;
    sale_price_from: number;
    sale_price_to: number;
  }
  
  export interface IListing {
    id: number;
    posted_on: string;
    property_type: string;
    property_id: number;
    house_id: string | null;
    condo_id: number | null;
    label_id: string | null;
    category_id: number;
    created_on: string;
    updated_on: string;
    house: IHouse;
    condo: ICondo;
    category: ICategory;
    label: {
      id: number | null;
      label: string | null;
      is_active: boolean | null;
      created_on: string | null;
      updated_on: string | null;
      property: string | null;
    };
    property: {
      id: number | null;
      info: string | null;
      is_active: boolean | null;
      created_on: string | null;
      updated_on: string | null;
      type: number | null;
    };
    building_images: Array<IBuildingImage>;
    featured_building_images: Array<IBuildingImage>;
    property_details: { [key: string]: string };
  }
  
  export interface ICategory {
    id: string;
    name: string;
    slug: string;
    is_active: boolean;
    created_on: string;
    updated_on: string;
    parent_category: number | null;
  }
  
  export interface IBuildingImage {
    id: number;
    url: string;
    filename: string;
  }