export const DefaultCondosFilter: any = {
  bedroom: '',
  deposit: {
    min: 100,
    max: 500000,
  },
  selling_status: '',
  occupancy: '',
  construction_status: '',
  address: '',
  title: '',
  propertyType: '',
  city: '',
  type: '',
};

export const sellingStatus = [
  { id: 2, label: 'Registration', value: 'Registration' },
  { id: 3, label: 'Pending', value: 'Pending' },
  { id: 4, label: 'Sold Out', value: 'Sold Out' },
  { id: 4, label: 'Selling', value: 'Selling' },
];

export const developmentStatus = [
  { id: 2, label: 'Completed', value: 'completed' },
  {
    id: 3,
    label: 'Under Construction',
    value: 'under construction',
  },
  { id: 4, label: 'Pre-Construction', value: 'pre-construction' },
];

export const listingType = [
  { id: 2, label: 'Condos', value: 'condo' },
  { id: 3, label: 'Houses', value: 'house' },
];
