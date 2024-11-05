export interface IWebsite {
  id: number;
  created_on: string;
  updated_on: string;
  name: string;
  sections: IWebsiteSection[];
}

export interface IWebsiteSection {
  id: number;
  name: string;
  section_type: string;
  latitude: null | string;
  longitude: null | string;
  is_map: boolean;
  images: IWebSectImage[] | null;
}

export interface IWebSectImage {
  id: number;
  url: string;
  filename: string;
}
