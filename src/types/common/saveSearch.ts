export interface ISaveSearch {
  id: string;
  label: string;
  value: string;
}
export interface ICreateSaveSearch extends Omit<ISaveSearch, 'id'> {}
