export interface ISearchResData {
  cities: Array<string>;
  addresses: Array<string>;
  searchTitles: Array<string>;
}

// Create a mapping from ISearchResData to ApiRequestType
export interface ISearchReqData {
  city: ISearchResData['cities'];
  address: ISearchResData['addresses'];
  title: ISearchResData['searchTitles'];
}

export interface IPropertiesOnMap {
  id: string;
  propName: string;
  position: [number, number];
  projDesc: string;
  projImage: string;
  projType: string;
  propSlug: string;
  propStatus?: string;
}

export interface IShortPropData {
  filtered_results_count: number;
  totalResults: number;
  data: Array<IPropertiesOnMap>;
}
